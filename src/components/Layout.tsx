import { Outlet, useNavigation, useNavigate, useLoaderData } from "react-router-dom";
import { useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Link, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';
import RestaurantSearch from './RestaurantSearch';
import { User } from "../models/User";
import { logoutUser } from "../services/UserService";


function Layout() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const loggedInUser = useLoaderData() as User;
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSignupDialog, setOpenSignUpDialog] = useState(false);
    const [user, setUser] = useState<User | undefined>(loggedInUser);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // console.log('user from layout: ', user);
    const handleLoginClick = () => {
        setOpenLoginDialog(true);
    };
    const handleLoginDialogClose = () => {
        setOpenLoginDialog(false);
    };
    const handleLoginSuccess = (user: User) => {
        setUser(user);
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

    // console.log(navigation);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logoutUser();
        setUser(undefined);
        handleMenuClose();
    };

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
                        {!user && <Button onClick={handleLoginClick} color="inherit">Login</Button>}
                        {user &&
                            <Box>
                                <IconButton color='inherit' size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleMenu}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                                    <MenuItem onClick={handleMenuClose}>My reviews</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                <Box >
                    <LoginDialog open={openLoginDialog}
                        handleClose={handleLoginDialogClose} 
                        handleSignUpClick={handleSignUpClick}
                        handleLoginSuccess={handleLoginSuccess} />
                    <SignUpDialog open={openSignupDialog} handleClose={handleSignUpDialogClose} handleLoginClick={handleLoginFromSignUpClick} />
                    {navigation.state === 'loading' && <div>Loading .....</div>}
                    {navigation.state === 'idle' && <Outlet />}
                </Box>

                
            </Box>
        </Box>
        
    );
}

export default Layout;
