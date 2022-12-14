import { PhotoCamera, Send } from "@mui/icons-material";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useParams, Form } from "react-router-dom";

export async function  action(data: any) {
    const formData = await data.request.formData();
    const reviewData = Object.fromEntries(formData);
    console.log('hello world I am running!');
    console.log('data: ', reviewData);
}

export function AddReview() {
    const { restaurantId } = useParams();

    return (
        <Box sx={{ mx: 5 }} mx = {5}>
            <Typography component='div'
                sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
                Share your expeirence at BBQ and Grill
            </Typography>
            <Form method="post">
                <Box mx={40} mt={5}>
                    <Stack spacing={2} justifyContent='start' alignItems='start'>
                        <TextField name="review" multiline fullWidth rows={10}
                            placeholder='Tell us about food, service, ambience and others' />
                        <Box>
                            <Rating name='review-rating' size='large' precision={0.5} />
                        </Box>
                        <Button disableElevation variant='contained' startIcon={<PhotoCamera />} component='label'>
                            Upload
                            <input hidden accept='image/*' multiple type='file' />
                        </Button>
                        <Button type='submit' disableElevation variant='contained' startIcon={<Send />} >Submit</Button>
                    </Stack>
                </Box>
            </Form>
        </Box>
    );
}