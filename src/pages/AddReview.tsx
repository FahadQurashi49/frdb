import { PhotoCamera, Send } from "@mui/icons-material";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useParams } from "react-router-dom";

function AddReview() {
    const { restaurantId } = useParams();

    const handleSubmit = () => {

    };

    return (
        <Box sx={{ mx: 5 }} mx = {5}>
            <Typography component='div'
                sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
                Share your expeirence at BBQ and Grill
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box mx={40} mt={5}>
                    <Stack spacing={2} justifyContent='start' alignItems='start'>
                        <TextField multiline fullWidth rows={10}
                            placeholder='Tell us about food, service, ambience and others' />
                        <Box>
                            <Rating name='review-rating' size='large' precision={0.5} />
                        </Box>
                        <Button disableElevation variant='contained' startIcon={<PhotoCamera />} component='label'>
                            Upload
                            <input hidden accept='image/*' multiple type='file' />
                        </Button>
                        <Button disableElevation variant='contained' startIcon={<Send />} >Submit</Button>
                    </Stack>
                </Box>
            </form>
        </Box>
    );
}

export default AddReview;