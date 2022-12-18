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

    addReview = async (review: Review, token: string): Promise<boolean> => {
        try {
            if (review && token) {
                const addReviewUrl = `${ReviewService.reviewEndpoint}`;
                const reviewPayload = this.createReviewPayload(review, token);
                const response = await fetch(addReviewUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: reviewPayload
                });
                const data = await response.json();
                if (data.status === 200) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            console.error(e);
            return false;
        }

    }

    private createReviewPayload(review: Review, token:string) {
        const { type, reviewText, restaurantId, userId, userName, rating } = review;
        const reviewPayload = {
            type,
            review_text: reviewText,
            restaurant_id: restaurantId,
            user_id: userId,
            user_name: userName,
            rating,
            imgs: '',
            token
        }
        return JSON.stringify(reviewPayload);
    }
}
const reviewService = new ReviewService();
export const { fetchReviews, fetchReview, addReview } = reviewService;