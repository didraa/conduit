import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {articlesAPI} from "../api";
import {Article, ArticleForEditor, MultipleArticles} from "../types/article";
import {AppDispatch} from "./store";
import {articleErrors} from "../types/error";
import axios, {AxiosError} from "axios";

interface ArticlesState {
    article: ArticleForEditor,
    errors: articleErrors | string,
    loading: boolean
}

const initialState:ArticlesState = {
    article: { title: '', body: '', tagList: [], description: '' },
    errors: '',
    loading: false,
}

const articleEditorSlice = createSlice({
    name: 'articleEditor',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createArticle.rejected, (state, action) => {
                if (action.payload) {
                    state.errors = action.payload;
                }
            })
    }
})

export const createArticle = createAsyncThunk<Article, ArticleForEditor, {rejectValue: string | articleErrors}>(
    'articleEditor/addArticle',
    async function(article, {rejectWithValue }) {
        try {
            const response = await articlesAPI.addArticle(article);
            return response.data.article;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                return rejectWithValue(Object.keys(data).map(key => key + " " + data[key]).join(", ") as string)

            }

            // if (axios.isAxiosError(error) && error.response) {
            //
            //     return rejectWithValue(axiosError.response.data);
                // const errorMessage: articleErrors = {
                //     errors: {
                //         description: error.response.data // Присваивание строки (или массива строк) к description
                //     }
                // };
                // return rejectWithValue(errorMessage);
            // }
        }
    }
)

export const editArticle = createAsyncThunk<Article, ArticleForEditor, {rejectValue: string | articleErrors}>(
    'articleEditor/editArticle',
    async function(article, {rejectWithValue }) {
        try {
            const response = await articlesAPI.updateArticle(article);
            return response.data.article;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                return rejectWithValue(Object.keys(data).map(key => key + " " + data[key]).join(", ") as string)

            }
        }
    }
)


export default articleEditorSlice.reducer;

