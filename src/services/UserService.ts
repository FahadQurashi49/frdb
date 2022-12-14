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
            throw Error(`Something went wrong while fetching user: ${data}`);
        }
        throw Error(`Please provide user`);
    }
}

const userService = new UserService();
export const { loginUser } = userService;