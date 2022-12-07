import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';
import RestaurantSearch from './RestaurantSearch';


function Layout() {
    const navigtion = useNavigation();
    const navigate = useNavigate();
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSignupDialog, setOpenSignUpDialog] = useState(false);

    const handleLoginClick = () => {
        setOpenLoginDialog(true);
    };
    const handleLoginDialogClose = () => {
        setOpenLoginDialog(false);
    };
    const handleSignUpClick = () => {
        setOpenLoginDialog(false);
        setOpenSignUpDialog(true);
    };

    const handleSignUpDialogClose = () => {
        setOpenSignUpDialog(false);
    };
    const handleLoginFromSignUpClick = () => {
        setOpenLoginDialog(true);
        setOpenSignUpDialog(false);
    };

    console.log(navigtion.state);

    const handleHomeClick = () => {
        navigate('/');
    };
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar elevation={0}>
                    <Toolbar>
                        <Link component='button' color='inherit' underline='none' variant='h6' onClick={handleHomeClick}>FRDB</Link>
                        <Box sx={{ flexGrow: 1 }} />
                        <RestaurantSearch></RestaurantSearch>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button onClick={handleLoginClick} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                <Box >
                    <LoginDialog open={openLoginDialog} handleClose={handleLoginDialogClose} handleSignUpClick={handleSignUpClick} />
                    <SignUpDialog open={openSignupDialog} handleClose={handleSignUpDialogClose} handleLoginClick={handleLoginFromSignUpClick} />
                    {navigtion.state === 'loading' && <div>Loading .....</div>}
                    {navigtion.state === 'idle' && <Outlet />}
                </Box>

                
            </Box>
        </Box>
        
    );
}

export default Layout;