import { ReactNode, useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';


interface Props {
    children?: ReactNode
    // any props that come into the component
}

function Layout({ children } : Props) {
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
    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar elevation={0}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            FRDB
                        </Typography>
                        <Button onClick={handleLoginClick} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                <Box >
                    <LoginDialog open={openLoginDialog} handleClose={handleLoginDialogClose} handleSignUpClick={handleSignUpClick} />
                    <SignUpDialog open={openSignupDialog} handleClose={handleSignUpDialogClose} handleLoginClick={handleLoginFromSignUpClick} />
                    {children}
                </Box>

                
            </Box>
        </Box>
        
    );
}

export default Layout;