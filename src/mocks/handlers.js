import { rest } from "msw";

const baseURL = "https://pixelstationproject5-api-1a9dadf46f0b.herokuapp.com/";

export const handlers = [
    // Handler for GET request to fetch user data
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.status(200), // Sending a 200 OK status
            ctx.json({
                pk: 2,
                username: "catboss",
                email: "",
                first_name: "",
                last_name: "",
                profile_id: 2,
                profile_image: "https://res.cloudinary.com/dvcs5hl0c/image/upload/v1/media/images/D2QvwVgX4AI_rvY_wq4uax",
            }) // Correctly close ctx.json
        );
    }),

    // Handler for POST request to logout
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200)); // Responding with a 200 status on logout
    }),
];
