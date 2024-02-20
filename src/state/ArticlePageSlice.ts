import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {articlesAPI} from "../api";
import {ArticleComment} from "../types/comment";
import {Article} from "../types/article";

interface ArticlePageState {
    currentArticle: Article | null,
    comments: ArticleComment[] | null,
    submittingComment: boolean
}

const initialState: ArticlePageState = {
    currentArticle: null,
    comments: null,
    submittingComment: false
}

const ArticlePageSlice = createSlice({
    name: 'ArticlePage',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadArticle.fulfilled, (state, action) => {
                state.currentArticle = action.payload;
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(setComment.fulfilled, (state, action) => {
                if (state.comments !== null) {
                    state.comments.push(action.payload)
                }
            })
    }
})

export const setComment = createAsyncThunk<ArticleComment, {text: string, slug: string} >(
    'comments/setComment',
    async (data) => {
        const {text, slug} = data;
        return await articlesAPI.addComment(text, slug);
    }
)

export const loadArticle = createAsyncThunk<Article, string>(
    'articles/loadArticle',
    async slug => await articlesAPI.getArticle(slug)
)

export const loadComments = createAsyncThunk<ArticleComment[], string>(
    'articles/loadComments',
    async function(slug) {
        const response = await articlesAPI.getComments(slug);
        return response.data.comments;
    }
)

export default ArticlePageSlice.reducer;


