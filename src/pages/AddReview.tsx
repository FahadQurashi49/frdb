import { PhotoCamera, Send } from "@mui/icons-material";
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useParams, Form, redirect } from "react-router-dom";

import { Review } from "../models/Review";
import { addReview } from "../services/ReviewService";
import { getLoginUser } from "../services/UserService";

export async function action(data: any) {
    const formData = await data.request.formData();
    const { review_text, review_rating, restaurant_id } = Object.fromEntries(formData);
    const user = getLoginUser();
    let state = '';
    if (user) {
        if (review_text && review_rating && restaurant_id) {
            const { name, email, jwt } = user;
            const review: Review = {
                reviewText: review_text,
                rating: parseFloat(review_rating),
                restaurantId: restaurant_id,
                userId: email,
                userName: name,
                type: 'review'
            }
            if (jwt) {
                const isSuccess = await addReview(review, jwt);
                state = isSuccess ? 'success' : 'failure';
            }
        } else {
            state = 'badReq';
        }
    } else {
        state = 'logout';
    }
    return redirect(`/restaurant/${restaurant_id}/reviews?reviewAdd=${state}`);
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
                        <TextField name="review_text" multiline fullWidth rows={10} required
                            placeholder='Tell us about food, service, ambience and others' />
                        <Box>
                            <Rating name='review_rating' aria-required='true' size='large' precision={0.5} />
                        </Box>
                        <Button disableElevation variant='contained' startIcon={<PhotoCamera />} component='label'>
                            Upload
                            <input hidden accept='image/*' multiple type='file' />
                        </Button>
                        <input type='hidden' name='restaurant_id' value={restaurantId} />
                        <Button type='submit' disableElevation variant='contained' startIcon={<Send />} >Submit</Button>
                    </Stack>
                </Box>
            </Form>
        </Box>
    );
}