import { Box, Typography, Link } from "@mui/material";

const footer = () => {
    return(
        <Box sx={{bgcolor: 'background.paper', p: 6, position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }} component="footer">
            <Typography
                variant="h6" align="center" gutterBottom
            >
                Similar Product Website Scraper
            </Typography>
            <Typography
                variant="subtitle1" align="center" color="text.secondary" component="p"
            >
                Developed By Oscar Sanz
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="">
                    My website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}

export default footer;