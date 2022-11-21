import { useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from "@mui/material";

import restaurant_arr from '../resource/restaurants.json';
import { mapToRestaurant } from "../models/Restaurant";
import RestaurantGridItem from "../components/RestaurantGridItem";

function Restaurants() {
    const { cityArea } = useParams();
    const city = cityArea?.split('_').shift();
    const area = cityArea?.split('_').pop();

    const restaurants = restaurant_arr.map(mapToRestaurant);

    return (
        <Box sx={{ mx: 15 }}>
            <Box sx={{ my: 2 }}>
                <Typography component="div" variant="h4">Restaurants in {city} {area}</Typography>
            </Box>
            
            <Grid container spacing={2}>
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantGridItem restaurant={restaurant} />
                    );
                })}
            </Grid>
        </Box>
        
    );
}

export default Restaurants;