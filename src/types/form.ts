export interface LoginFormValues {
    email: string
    password: string
}

export interface RegisterFormValues {
    username: string,
    email: string,
    password: string
}

export interface SettingsFormValue {
    image: string,
    username: string,
    bio: string,
    email: string,
    password: string
}

export interface ArticleFormValues {
    title: string,
    description: string,
    body: string,
    tagList: string[]
}


export type CommentsFormValues = {
    text: string
}

export class CommetsFormValues {
}