import { useParams, useLoaderData } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from "@mui/material";

import { Restaurant } from "../models/Restaurant";
import RestaurantGridItem from "../components/RestaurantGridItem";

function Restaurants() {
    const { cityArea } = useParams();
    const restaurants = useLoaderData() as Restaurant[];
    const city = cityArea?.split('_').shift();
    const area = cityArea?.split('_').pop();

    return (
        (<Box sx={{ mx: 15 }}>
            <Box sx={{ my: 2 }}>
                <Typography component="div" sx={{ typography: { md: 'h4', sm: 'h5', xs: 'h6' } }} >
                    Restaurants in {city} {area}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantGridItem restaurant={restaurant} key={restaurant.id} />
                    );
                })}
            </Grid>
        </Box>) 
    );
}

export default Restaurants;