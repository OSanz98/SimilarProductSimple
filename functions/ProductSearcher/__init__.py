import logging
import json
import azure.functions as func
import requests
from collections import Counter
from bs4 import BeautifulSoup
from builtins import set, sum
import os
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

keyVaultName = os.environ["KEY_VAULT_NAME"]
KVUri = f"https://{keyVaultName}.vault.azure.net"
credential = DefaultAzureCredential()
client = SecretClient(vault_url=KVUri, credential=credential)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    productTitle = req.params.get('productTitle')
    if not productTitle:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            productTitle = req_body.get('productTitle')

    if productTitle:
        products = call_product_bing_search(productTitle)

        if type(products) == str:
            return func.HttpResponse(products, status_code=404)
        elif type(products) == dict:
            return func.HttpResponse(json.dumps(products), mimetype='application/json')
    else:
        return func.HttpResponse(
             "Http Triggered function executed. No parameters passed, please pass a product title in the query string or body request",
             status_code=200
        )

def call_product_bing_search(search_name):
    keyName = os.environ["SubscriptionKey"]
    subKey = client.get_secret(keyName).value
    web_search_endpoint = os.environ["WebSearchEndpoint"]
    headers = {"Ocp-Apim-Subscription-Key": subKey}
    params={"q": f"site:amazon.co.uk {search_name}", "textDecorations": True, "textFormat": "HTML"}
    
    response = requests.get(web_search_endpoint, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()

    soupHeaders = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"}

    products = {}
    if "webPages" in search_results:
        for result in search_results["webPages"]["value"]:
            product_name = result["name"]
            product_url = result["url"]
            symbol = ""
            pound = ""
            fraction = ""
            try:
                product_page = requests.get(product_url, headers=soupHeaders)
                soup = BeautifulSoup(product_page.content, 'html.parser')
                price = soup.find('span', {'class': 'a-price-whole'})
                if price is not None:
                    pound = price.get_text().strip()

                price_symbol = soup.find('span', {'class': 'a-price-symbol'})
                if price_symbol is not None:
                    symbol = price_symbol.get_text().strip()

                price_fraction = soup.find('span', {'class': 'a-price-fraction'})
                if price_fraction is not None:
                    fraction = price_fraction.get_text().strip()
                
                product_price = symbol + pound + fraction
            except Exception as e:
                return f"Error whilst trying to get price: {e}"
            

            if calculate_similarity_score(search_name, product_name) > 0.4:
                product_dict = {
                    "url": product_url,
                    # "image": image,
                    "price": product_price
                }  
                products[product_name] = product_dict
        return products
    else:
        return "No web pages found for query"
    

def calculate_similarity_score(search_name, product_name):
    try:
        search_vec = Counter(search_name.lower().split())
        product_vec = Counter(product_name.lower().split())
        # get the common tokens in both Counters
        common_tokens = set(search_vec.keys()) & set(product_vec.keys())
        # dot product
        dot_product = sum(search_vec[token] * product_vec[token] for token in common_tokens)
        # calculate the magnitude of the vectors
        search_mag = sum(search_vec[token]**2 for token in search_vec.keys())
        product_mag = sum(product_vec[token]**2 for token in product_vec.keys())

        # calculate the cosine similarity
        if search_mag == 0 or product_mag == 0:
            return 0
        else:
            return dot_product / ((search_mag * product_mag) ** 0.5)
    except Exception as e:
        return f"Couldn't calculate cosine similarity score: {e}"