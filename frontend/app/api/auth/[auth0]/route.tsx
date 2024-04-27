import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import * as dotenv from "dotenv";

dotenv.config();

export const GET = handleAuth({
    login: handleLogin({
        returnTo: "/",
    }),
    signup: handleLogin({
        authorizationParams: {
            screen_hint: "signup",
        },
        returnTo: "/",
    }),
});