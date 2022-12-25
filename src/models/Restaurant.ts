export interface Restaurant {
    id: string;
    type: string;
    name: string;
    description: string;
    location: string;
    city?: string;
    area?: string;
    avgRating: number;
    totalRatings: number;
    logo: string;
}

export function mapToRestaurant(restaurant: any) {
    const { id, type, restaurant_name,
        description, location, avg_rating,
        total_ratings, logo } = restaurant;
    const { city, area } = parseLocation(location);
    return {
        id,
        type,
        name: restaurant_name,
        description,
        location,
        city,
        area,
        avgRating: parseFloat(avg_rating.toFixed(1)),
        totalRatings: total_ratings,
        logo
    };
}

const parseLocation = (location: string) => {
    const cityArea = location.replaceAll('#', '').split(' ');
    const city = cityArea.shift();
    const area = cityArea.pop();
    return {
        city,
        area
    };
}