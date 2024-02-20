import {Profile} from "./profile";
import {createArticle} from "../state/ArtileEditorSlice";

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export type CreateArticleType = typeof createArticle;


export interface ArticleForEditor {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface MultipleArticles {
    articles: Article[];
    articlesCount: number;
}
interface ArticleLike extends Article {
    "id": number,
    "authorId": number,
    "tagList": [],
    "favoritedBy": [
        {
            "id": number,
            "email": string,
            "username": string,
            "password": string,
            "image": string,
            "bio": string,
            "demo": boolean
        }
    ],
}

