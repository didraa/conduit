import axios from "axios";
import {Profile} from "../types/profile";
import {Article, ArticleForEditor, MultipleArticles} from "../types/article";
import {User} from "../types/user";
import {SettingsFormValue} from "../types/form";
import {ArticleComment} from "../types/comment";

const instance = axios.create({
    baseURL: 'https://api.realworld.io/api/',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const tagsAPI = {
    async getTags(): Promise<string[]> {
        const response = await instance.get(`/tags`);
        return response.data.tags;
    },
}

export const userAPI = {
    async signUp(username: string, email: string, password: string) {
        const response = await instance.post(`/users`, {user: {username, email, password}});
        return response.data.user;
    },
    async signIn(email: string, password: string): Promise<User> {
        const response = await instance.post(`/users/login`, {user: {email, password}});
        return response.data.user;
    },
    async updateSettings(user: SettingsFormValue): Promise<User> {
        const response = await instance.put(`/users`, {user})
        return response.data.user;
    },
    async login(): Promise<User> {
        const response = await instance.get(`/user`)
        return response.data.user;
    }
}

export const profileAPI = {
    async getProfile(username: string): Promise<Profile> {
        const response = await instance.get(`/profiles/${username}`,);
        return response.data.profile;
    },
    async updateProfile(username: string): Promise<Profile> {
        return await instance.put(`/profiles/${username}`,);
    },
    async follow(username: string): Promise<Profile> {
        const response = await instance.post(`/profiles/${username}/follow`,);
        return response.data.profile;
    },
    async unfollow(username: string): Promise<Profile> {
        return await instance.delete(`/profiles/${username}/unfollow`,);
    },
}

export const articlesAPI = {
    async getArticles(offset: number): Promise<MultipleArticles> {
        const response = await instance.get(`/articles`,
            {
                params: {
                    limit: 10,
                    offset
                }
            });
        return response.data;
    },
    async addArticle(article: ArticleForEditor) {
        const articleData = {
            article
        }
        return await instance.post(`/articles`, articleData);
    },
    async updateArticle(article: ArticleForEditor) {
        const articleData = {
            article
        }
        return await instance.put(`/articles`, articleData);
    },
    async getArticle(slug: string): Promise<Article> {
        const response = await instance.get(`/articles/${slug}`);
        return response.data.article;
    },
    async getComments(slug: string) {
        return await instance.get(`/articles/${slug}/comments`);
    },
    async getUserArticles(username: string) {
        return await instance.get(`/articles?author=${username}`)
    },
    async getUserFavorited(username: string) {
        return await instance.get(`/articles?favorited=${username}`)
    },
    async getArticlesByTag(slug: string) {
        return await instance.get(`/articles/${slug}`)
    },
    async like(slug: string) {
        return await instance.post(`/articles/${slug}/favorite`)
    },
    async removeLike(slug: string) {
        return await instance.delete(`/articles/${slug}/favorite`)
    },
    async feedArticles(offset: number) {
        const response = await instance.get(`/articles/feed`,
            {
                params: {
                    limit: 10,
                    offset
                }
            })
        return response.data;
    },
    async slugArticles(tag: string, offset: number): Promise<MultipleArticles> {
        const response = await instance.get(`/articles?tag=${tag}`,
            {
                params: {
                    limit: 10,
                    offset
                }
            })
        return response.data;
    },
    async myArticles(userName: string) {
        return await instance.get(`/articles?author=${userName}`)
    },

    async addComment(text: string, slug: string):Promise<ArticleComment> {
        const response = await instance.post(`/articles/${slug}/comments`, {comment: {body: text}});
        return response.data.comment;
    },
    async removeComment(text: string, slug: string):Promise<Comment> {
        const response = await instance.delete(`/articles/${slug}/comments`);
        return response.data.comment;
    },
}


