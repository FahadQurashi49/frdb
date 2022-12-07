import { ApiEndpoint } from '../utils/Constants';
import { mapToRestaurant, Restaurant } from "../models/Restaurant";

class RestaurantService {
    private static restaurantEndpoint = `${ApiEndpoint}/restaurant`;

    async fetchRestaurants(cityArea?: string): Promise<Restaurant[] | null> {
        try {
            if (cityArea) {
                const city = cityArea?.split('_').shift();
                const area = cityArea?.split('_').pop();
                const queryParam = encodeURIComponent(`#${city} #${area}`);
                const response = await fetch(`${RestaurantService.restaurantEndpoint}?location=${queryParam}`);
                const data = await response.json();
                if (data?.status === 200) {
                    return data.items.map(mapToRestaurant);
                }
            }
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
const restaurantService = new RestaurantService();
export const { fetchRestaurants } = restaurantService;