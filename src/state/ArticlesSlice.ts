import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {articlesAPI} from "../api";
import {Article, MultipleArticles} from "../types/article";
import {AppDispatch} from "./store";

interface ArticlesState {
    articles: Article[] | null;
    currentTag: string;
    selectedTab: string;
    isLoading: boolean;
    currentPage: number;
    articlesCount: number;
}

const initialState:ArticlesState = {
    articles: null,
    currentTag: '',
    selectedTab: 'global',
    isLoading: false,
    currentPage: 1,
    articlesCount: 0
}

interface LikesPayload {
    currentSlug: string;
    count: number;
    favorited: boolean;
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setLikes(state, action: PayloadAction<LikesPayload>) {
            if (state.articles != null) {
                state.articles = state.articles.map(article => {
                    if (article.slug === action.payload.currentSlug) {
                        return {
                            ...article,
                            favoritesCount: action.payload.count,
                            favorited: action.payload.favorited
                        };
                    }
                    return article;
                });
            }
        },
        removeCurrentTag(state) {
            state.currentTag = '';
        },
        setCurrentTag(state, action) {
            state.currentTag = action.payload;
        },
        setTab(state, action) {
            state.selectedTab = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedArticles.pending, (state, action) => {
                state.isLoading = true;
                state.articles = null;
            })
            .addCase(getGlobalArticles.pending, (state, action) => {
                state.isLoading = true;
                state.articles = null;
            })
            .addCase(getArticlesByTag.pending, (state, action) => {
                state.isLoading = true;
                state.articles = null;
            })
            .addCase(loadUserArticles.pending, (state) => {
                state.isLoading = true;
                state.articles = null;
            })
            .addCase(loadUserFavorited.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.isLoading = false;
            })
            .addCase(loadUserFavorited.pending, (state) => {
                state.articles = [];
                state.isLoading = true;
            })
            .addCase(loadUserArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(getGlobalArticles.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.articlesCount = action.payload.articlesCount;
                state.isLoading = false;
            })
            .addCase(getFeedArticles.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.articlesCount = action.payload.articlesCount;
                state.isLoading = false;
            })
            .addCase(getArticlesByTag.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.articlesCount = action.payload.articlesCount;
                state.isLoading = false;
            })

    }
})

export const getGlobalArticles = createAsyncThunk<MultipleArticles, number>(
    'articles/getGlobalArticles',
    async function(offset) {
        return await articlesAPI.getArticles(offset);
    }
)

export const addLike = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'articles/addLike',
    async function(slug, {dispatch}) {
        const response = await articlesAPI.like(slug);
        const count = response.data.article.favoritesCount;
        const currentSlug = response.data.article.slug;
        const favorited = response.data.article.favorited;
        dispatch(setLikes({count, currentSlug, favorited}))
    }
)

export const loadUserFavorited = createAsyncThunk<Article[], string>(
    'profile/loadUserFavorited',
    async  (username) => {
        const response = await articlesAPI.getUserFavorited(username);
        return response.data.articles;
    }
)

export const loadUserArticles = createAsyncThunk<Article[], string>(
    'profile/loadUserArticles',
    async (username) => {
        const response = await articlesAPI.getUserArticles(username);
        return response.data.articles;
    }
)


export const deleteLike = createAsyncThunk<void, string, {dispatch: AppDispatch}>(
    'articles/deleteLike',
    async function(slug, {dispatch})  {
        const response = await articlesAPI.removeLike(slug);
        const count = response.data.article.favoritesCount;
        const currentSlug = response.data.article.slug;
        const favorited = response.data.article.favorited;
        dispatch(setLikes({count, currentSlug, favorited}))
    }
)


export const getFeedArticles = createAsyncThunk<MultipleArticles, number>(
    'articles/getFeedArticles',
    async function(offset) {
        return await articlesAPI.feedArticles(offset);
    }
)

export const getArticlesByTag = createAsyncThunk<MultipleArticles, {currentTag: string, currentPage: number}>(
    'articles/getArticlesByTag',
    async function(obj) {
        const {currentTag, currentPage} = obj;
        return await articlesAPI.slugArticles(currentTag, (currentPage - 1) * 10);
    }
)

export const {setLikes, setCurrentTag, setTab, removeCurrentTag, setCurrentPage} = articleSlice.actions;
export default articleSlice.reducer;

