import { ApiEndpoint } from '../utils/Constants';
import { mapToReview, Review } from "../models/Review";

class ReviewService {
    private static reviewEndpoint = `${ApiEndpoint}/review`;

    async fetchReviews(restaurantId?: string): Promise<Review[] | null> {
        if (restaurantId) {
            const response = await fetch(`${ReviewService.reviewEndpoint}?restaurant_id=${restaurantId}`);
            const data = await response.json();
            if (data?.status === 200) {
                return data.items.map(mapToReview);
            }
            throw Error(`Reviews not fetched, status: ${data.status}`);
        }
        throw Error('Please provide restaurant id');
    }

    async fetchReview(reviewId?: string): Promise<Review> {
        if (reviewId) {
            const response = await fetch(`${ReviewService.reviewEndpoint}/${reviewId}`);
            const data = await response.json();
            if (data) {
                if (data.error) {
                    throw Error(data.error);
                }
                return mapToReview(data);
            }
            throw Error('Unable to fetch review');
        }
        throw Error('Please provide review id');
    }
}
const reviewService = new ReviewService();
export const { fetchReviews, fetchReview } = reviewService;