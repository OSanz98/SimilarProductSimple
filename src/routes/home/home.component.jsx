import {Box, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Link } from "@mui/material";
import { useImmer } from "use-immer";
import { useLayoutEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import columns from '../../utils/gridColumns.component';
import NewProduct from '../../components/newProduct/newProduct.component';
import LoadingComponent from "../../components/loading/loading.component";

const HomeRoute = () => {
    const [currentProduct, setCurrentProduct] = useImmer({title: "No Product", url: "undefined",  image: "", similarProducts:[]})
    const [maxWidth, setMaxWidth] = useState('800px');
    const [isCreating, setIsCreating] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const handleCreateNewProduct = () => {
        setIsCreating(!isCreating);
        console.log('button clicked');
    };

    const handleBackPage = () => {
        setIsCreating(false);
    };

    const handleNewProduct = (title, url) => {
        setInProgress(true);
        setCurrentProduct(draft => {
            draft.title = title
            draft.url = url
        });

        // call other functionality here
        setTimeout(() => {
            setInProgress(false);
            setIsCreating(false);
        }, 5000)
    };
    
    useLayoutEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const newMaxWidth = windowWidth - 100;
            setMaxWidth(`calc(${newMaxWidth}px)`);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
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
                <Container component="main" sx={{mt: 8, mb: 2}} maxWidth="sm">
                    <Box sx={{bgcolor: 'background.paper', pt: 9, pb: 8}}>
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
                                Currently searched for: {currentProduct.title}
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                                Product URL: 
                                <Link sx={{ml: 3, maxWidth: '150px'}} rel="noreferrer" target="_blank" href={currentProduct.url}>{currentProduct.url}</Link>
                            </Typography>
                            <Button onClick={handleCreateNewProduct} aria-label="search new product" variant="contained" startIcon={<AddIcon />} sx={{borderRadius: 10, mt: 5}}>
                                New Product
                            </Button>
                        </Container>
                    </Box>
                    {currentProduct.similarProducts.length > 0 && (
                        <DataGrid columns={columns} rows={currentProduct.similarProducts}/>
                    )}
                </Container>
            )}
            {isCreating && !inProgress && (
                <NewProduct goBack={handleBackPage} onClick={handleNewProduct} />
            )}
            <LoadingComponent open={inProgress}/>
        </Box>
    )
};

export default HomeRoute;