import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";

import { User } from "../models/User";
import { loginUser } from "../services/UserService";

interface Props {
    open: boolean,
    redirectTo?: string,
    handleClose: () => void
    handleSignUpClick: () => void
    handleLoginSuccess: (user: User) => void
    // any props that come into the component
}

function LoginDialog({ open, redirectTo, handleClose, handleSignUpClick, handleLoginSuccess }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const user: User = { email, password };
            setLoadingLogin(true);
            const loggedInUser = await loginUser(user);
            setErrorMsg('');
            setLoadingLogin(false);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            handleClose();
            handleLoginSuccess(loggedInUser);
        } catch (error: any) {
            // console.error(error);
            setLoadingLogin(false);
            if (error?.message) {
                setErrorMsg(error.message);
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box m={5}>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <DialogTitle>
                        Login
                    </DialogTitle>
                    <DialogContent sx={{ width: 300 }}>
                        <Stack spacing={2}>
                        <TextField name='loginEmail' type='email' placeholder='Email' 
                            variant='outlined' value={email} required
                            onChange={(e) => setEmail(e.target.value)} />
                        <TextField name='loginPassword' type='password' placeholder='Password' 
                            variant='outlined' value={password} required
                            onChange={(e) => setPassword(e.target.value)} />
                        <DialogContentText variant='subtitle2'>
                            {
                                errorMsg && 
                                <Typography component='div' variant='body2' 
                                    color='red' >
                                    {errorMsg}
                                </Typography>
                            }
                            Don't have an account?&nbsp;
                            <Link
                                component='button'
                                variant='body2'
                                underline='hover'
                                onClick={handleSignUpClick}
                                disabled={loadingLogin}
                            >
                                Sign up
                            </Link>
                        </DialogContentText>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button disableElevation disabled={loadingLogin} variant='contained' onClick={handleClose}>Cancel</Button>
                    <Button disableElevation disabled={loadingLogin} type='submit' variant='contained'>
                        
                        {loadingLogin && <CircularProgress size={18} sx={{mx: 2.2, my:0.5}}></CircularProgress>}
                        {!loadingLogin &&  'Submit'}
                    </Button>
                        
                   
                    
                    </DialogActions>
                </form>
            </Box>
        </Dialog>
    );
}

export default LoginDialog;