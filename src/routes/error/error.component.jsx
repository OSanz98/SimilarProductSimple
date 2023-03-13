import { useRouteError } from "react-router-dom";
import {Box, CssBaseline, Typography } from "@mui/material";

export default function ErrorRoute() {
    const error = useRouteError();
    console.error(error);

    return(
        <Box component='main' display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CssBaseline />
            <Typography variant="h2">Sorry!</Typography>
            <Typography variant="h6">An unexpected error has occured!</Typography>
            <Typography variant="body2">{error.statusText || error.message}</Typography>
        </Box>
    )

}