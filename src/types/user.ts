export interface User {
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string | null
}

export interface RegistretedUser {
    username: string,
    email: string,
    password: string
}

export interface UserForRegistration {
    username: string;
    email: string;
    password: string;
}

export interface UserForLogin {
    email: string;
    password: string;
}

