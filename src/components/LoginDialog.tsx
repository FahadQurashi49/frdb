import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";

import { User } from "../models/User";
import { loginUser } from "../services/UserService";

interface Props {
    open: boolean,
    handleClose: () => void
    handleSignUpClick: () => void
    // any props that come into the component
}

function LoginDialog({ open, handleClose, handleSignUpClick }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: User = { email, password };
        console.log(user);
        const loggedInUser = await loginUser(user);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        handleClose();
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
                            Don't have an account?&nbsp;
                            <Link
                                component='button'
                                variant='body2'
                                underline='hover'
                                onClick={handleSignUpClick}
                            >
                                Sign up
                            </Link>
                        </DialogContentText>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Submit</Button>
                    </DialogActions>
                </form>
            </Box>
        </Dialog>
    );
}

export default LoginDialog;