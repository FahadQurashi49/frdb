import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Restaurant } from '../models/Restaurant';

interface Props {
    restaurant: Restaurant
    // any props that come into the component
}

function RestaurantGridItem({ restaurant }: Props) {
    return (
        <Grid xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/restaurant_pic.jpeg"
                        alt={restaurant.name}
                    />
                    <CardContent>
                        <Typography noWrap gutterBottom variant="h5" component="div">
                            {restaurant.name}
                        </Typography>
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