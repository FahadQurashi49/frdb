import { ReactNode } from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

interface Props {
    children?: ReactNode
    // any props that come into the component
}

function Layout({ children } : Props) {
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            FRDB
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                <Box sx={{
                    height: '100vh',
                    bgcolor: '#f9f9f9'
                }}>
                    {children}
                </Box>

                
            </Box>
        </Box>
        
    );
}

export default Layout;