import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material";

import { Restaurant } from '../models/Restaurant';

interface Props {
    restaurant: Restaurant
    // any props that come into the component
}

function RestaurantGridItem({ restaurant }: Props) {
    const navigate = useNavigate();

    const handleRestaurantClick = () => {
        navigate(`/restaurant/${restaurant.id}/reviews`);
    };
    return (
        <Grid xs={12} sm={6} md={3} >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleRestaurantClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/bbq.jpeg"
                        alt={restaurant.name}
                    />
                    <CardContent>
                        <Typography noWrap gutterBottom variant="h5" component="div">
                            {restaurant.name}
                        </Typography>
                        <Stack direction='row'>
                            <Rating name='read-only' value={restaurant.avgRating} size='small' precision={0.1} readOnly />
                            <Box sx={{ ml: 0.5, typography: 'subtitle2' }}>
                                {restaurant.avgRating}/5 ({restaurant.totalRatings})
                            </Box>
                        </Stack>
                        <Typography noWrap variant="body2" color="text.secondary">
                            {restaurant.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default RestaurantGridItem;