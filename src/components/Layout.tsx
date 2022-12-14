import { Outlet, useNavigation, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';
import RestaurantSearch from './RestaurantSearch';
import { User } from "../models/User";


function Layout() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const user = useLoaderData() as User;
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSignupDialog, setOpenSignUpDialog] = useState(false);

    console.log('user from layout: ', user);
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

    console.log(navigation);

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
                    {navigation.state === 'loading' && <div>Loading .....</div>}
                    {navigation.state === 'idle' && <Outlet />}
                </Box>

                
            </Box>
        </Box>
        
    );
}

export default Layout;
