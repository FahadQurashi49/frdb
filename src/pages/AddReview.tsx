import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Rating, TextField, Typography } from "@mui/material";
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { useParams, Form, redirect, useLoaderData } from 'react-router-dom';
import { Restaurant } from '../models/Restaurant';

import { Review } from '../models/Review';
import { addReview } from '../services/ReviewService';
import { getLoginUser } from '../services/UserService';

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
    const restaurant = useLoaderData() as Restaurant;
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number | null>(null);

    return (
        <Box sx={{ mx: 5 }} mx = {5} mt={2}>
            <Form method="post">
                <Box mx={40} mt={5}>
                    <Stack spacing={2} justifyContent='center' alignItems='center'>
                        <Typography component='div'
                            sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
                            {restaurant.name}
                        </Typography>
                        <TextField name="review_text" multiline fullWidth rows={10}
                            required value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                            placeholder='Tell us about food, service, ambience and others' />
                        <Box>
                            <Rating name='review_rating' aria-required='true' 
                            size='large' precision={0.5} 
                            value={rating} onChange={(e, value) => setRating(value)} />
                        </Box>
                        <Button sx={{px: 2}} disableElevation variant='outlined' startIcon={<PhotoCamera />} component='label'>Upload
                            <input hidden accept='image/*' multiple type='file' />
                        </Button>
                        <input type='hidden' name='restaurant_id' value={restaurantId} />
                    </Stack>
                    <Stack mt={2} spacing={2} direction='row' justifyContent='end' alignItems='end'>
                        <Button disableElevation variant='contained'>
                            Cancel
                        </Button>
                        <Button disabled={!(rating && reviewText)} type='submit' disableElevation variant='contained'>
                            Submit
                        </Button>
                    </Stack>
                    
                </Box>
            </Form>
        </Box>
    );
}