import logging
import json
import azure.functions as func
from shared_code import scraper


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
        return func.HttpResponse(json.dumps(scraper.scrape_amazon(productTitle)), mimetype='application/json')
    else:
        return func.HttpResponse(
             "Http Triggered function executed. No parameters passed, please pass a product title in the query string or body request",
             status_code=200
        )
