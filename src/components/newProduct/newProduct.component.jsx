import { useState } from "react";
import { Card, CardHeader, Button, CardContent, TextField, Toolbar } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useImmer } from "use-immer";

const NewProduct = ({onClick, goBack}) => {
    const [productName, setProductName] = useState('');
    const [productURL, setProductURL] = useState('');
    const [errors, setErrors] = useImmer({productName: '', productURL: ''})

    const handleGoBack = () => {
        if(goBack){
            goBack();
        }
    };

    const handleResetFields = () => {
        setProductName('');
        setProductURL('');
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(productName != "" && productURL != "") {
            if(onClick){
                onClick(productName, productURL);
            }
        } else {
            if(productName == ""){
                setErrors(err => {
                    err.productName = 'Product Name is required'
                })
            }
            if(productURL == ""){
                setErrors(err => {
                    err.productURL = 'Product Name is required'
                })
            }
        }
    };

    const handleTextFieldChange = (event) => {
        const {name, value} = event.target;
        if(name == "productName") {
            setProductName(value)
            setErrors(err => {
                err.productName = ''
            });
        } else {
            setProductURL(value)
            setErrors(err => {
                err.productURL = ''
            });
        }
    };

    return(
        <Card className="newProduct" sx={{mt: '100px'}}> 
            <Toolbar>
                <Button startIcon={<ArrowBackIosNewIcon />} onClick={handleGoBack} edge="start" aria-label="go back">
                     Go Back
                </Button>
            </Toolbar>
            <CardHeader
                title="Search For New Product:"
                sx={{textAlign: 'left'}}
                action = {
                    <Button onClick={handleResetFields} startIcon={<RestartAltIcon />} aria-label="reset">
                        Reset fields
                    </Button>
                }
            />
            <CardContent component="main">
                <form onSubmit={handleFormSubmit}>
                    <TextField 
                        label="Product Name" 
                        variant="outlined" 
                        fullWidth
                        value={productName}
                        name="productName"
                        onChange={handleTextFieldChange}
                        sx={{mb: 2}}
                        error={!!errors.productName}
                        helperText={errors.productName}
                    />
                    <TextField 
                        label="Product URL" 
                        variant="outlined" 
                        fullWidth
                        value={productURL}
                        name="productURL"
                        onChange={handleTextFieldChange}
                        error={!!errors.productURL}
                        helperText={errors.productURL}
                    />

                    <Button type="submit" variant="contained" sx={{borderRadius: 10, mt: 2}}>
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
};

export default NewProduct;