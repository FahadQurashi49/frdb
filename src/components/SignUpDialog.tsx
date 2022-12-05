import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";

interface Props {
    open: boolean,
    handleClose: () => void
    handleLoginClick: () => void
    // any props that come into the component
}

function SignUpDialog({ open, handleClose, handleLoginClick }: Props) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <Box m={5}>
                <DialogTitle>
                    SignUp
                </DialogTitle>
                <DialogContent sx={{ width: 300 }}>
                    <Stack spacing={2}>
                        <TextField type='text' placeholder='Name' variant='outlined' />
                        <TextField type='email' placeholder='Email' variant='outlined' />
                        <TextField type='password' placeholder='Password' variant='outlined' />
                        <DialogContentText variant='subtitle2'>
                            Already have an account?&nbsp;
                            <Link
                                component='button'
                                variant='body2'
                                underline='hover'
                                onClick={handleLoginClick}
                            >
                                Login
                            </Link>
                        </DialogContentText>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>

            </Box>
        </Dialog>
    );
}

export default SignUpDialog;