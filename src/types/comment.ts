import {Profile} from "./profile";

export interface ArticleComment {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: Profile;
}
