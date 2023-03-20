import { Box, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
    return(
        <Box 
            sx={{py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
            }} 
            component="footer"
        >
                <Divider />
                <Typography
                    variant="h6" align="center" gutterBottom marginTop={2}
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

export default Footer;