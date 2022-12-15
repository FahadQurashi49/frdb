import { ApiEndpoint } from '../utils/Constants';
import { User } from "../models/User";

class UserService {
    async loginUser(user: User) {
        if (user) {
            const loginUrl = `${ApiEndpoint}/login`;
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ method: 'login', email: user.email, password: user.password })
            });
            const data = await response.json();
            if (data.status === 200) {
                delete data.status;
                return data as User;
            }
            throw Error(data?.error ? data.error : 'Something went wrong while login user');
        }
        throw Error(`Please provide user`);
    }
}

const userService = new UserService();
export const { loginUser } = userService;