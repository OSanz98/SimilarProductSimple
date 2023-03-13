import { Card, Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer } from "@mui/material";
import { MenuRounded } from "@mui/icons-material";
import { useImmer } from "use-immer";
import theme from "../../utils/theme.component";
const drawerWidth = 240;

const HomeRoute = (props) => {
    const [deviceState, setDeviceState] = useImmer({isMobile: false})
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setDeviceState(draft => {
            draft.isMobile = !draft.isMobile
        });
    };

    return(
        <Box display="flex">
            <CssBaseline />
            <AppBar position="fixed" sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`}
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuRounded />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Similar Products Simple
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink:{ sm: 0}}}
                aria-label="Saved products navbar"  
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={deviceState.isMobile}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,},
                    }}
                    PaperProps= {{
                        sx: {
                             backgroundColor: theme.palette.background.drawer,
                            color: "white"
                        }
                    }}
                    
                >
                    {/* include sidebar nav stuff */}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        backgroundColor: 'black'
                    }}
                    PaperProps= {{
                        sx: {
                            backgroundColor: theme.palette.background.drawer,
                            color: "white"
                        }
                    }}
                    open
                >
                    {/* <ProductSideBar products={products} onClick={productHandler} /> */}
                </Drawer>

            </Box>


        </Box>
    )
};

export default HomeRoute;