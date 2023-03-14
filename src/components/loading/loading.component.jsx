import { Backdrop, CircularProgress } from "@mui/material"; 

const LoadingComponent = ({ open }) => {
    return (
        <Backdrop open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
};

export default LoadingComponent;