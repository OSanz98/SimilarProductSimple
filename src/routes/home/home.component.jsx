import {Box, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Link } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import NewProduct from '../../components/newProduct/newProduct.component';
import LoadingComponent from "../../components/loading/loading.component";
import CustomDataGrid from "../../components/datagrid/datagrid.component";
import axios from "axios";


const HomeRoute = () => {
    const [productTitle, setProductTitle] = useState('No Product');
    const [productURL, setProductURL] = useState('undefined');
    const [similarProducts, setSimilarProducts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const handleCreateNewProduct = () => {
        setIsCreating(!isCreating);
    };

    const handleBackPage = () => {
        setIsCreating(false);
    };

    const handleNewProduct = async (title, url) => {
        setInProgress(true);
        setProductTitle(title);
        setProductURL(url);
        await getProductData(title);
        setInProgress(false);
        setIsCreating(false);
    };

    const getProductData = async (title) => {
        await axios.get('https://similarproductfunction.azurewebsites.net/api/ProductSearcher', {
            params: {
                productTitle: title
            }
        })
        .then((response) => {
            const productArr = Object.entries(response.data).map(([name, product]) => ({
                id: name,
                name: name,
                url: product.url,
                price: product.price
            }));
            setSimilarProducts(productArr);
        })
        .catch((err) => {
            throw new Error('There was a problem with getting similar products: ', err);
        });
    }

    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100vh'
            }}
        >
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Similar Products Simple
                    </Typography>
                </Toolbar>
            </AppBar>
            {!isCreating && !inProgress && (
                <Container component="main" sx={{mt: 8}} maxWidth='sm' >
                    <Box sx={{bgcolor: 'background.paper', pb: 8}}>
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant='h3'
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                Similar Product Scraper
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                                Currently searched for: {productTitle}
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                                Product URL: 
                                <Link sx={{ml: 3, maxWidth: '150px'}} rel="noreferrer" target="_blank" href={productURL}>{productURL}</Link>
                            </Typography>
                            <Button onClick={handleCreateNewProduct} aria-label="search new product" variant="contained" startIcon={<AddIcon />} sx={{borderRadius: 10, mt: 5}}>
                                New Product
                            </Button>
                        </Container>
                    </Box>
                </Container>
            )}
            {similarProducts.length > 0 && !isCreating && !inProgress && (
                <CustomDataGrid similarProducts={similarProducts}/>
            )}
            
            {isCreating && !inProgress && (
                <NewProduct goBack={handleBackPage} onClick={handleNewProduct} />
            )}
            <LoadingComponent open={inProgress}/>
        </Box>
    )
};

export default HomeRoute;