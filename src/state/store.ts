import { configureStore } from '@reduxjs/toolkit';
import tagsSlice from "./TagsSlice";
import appSlice from "./AppSlices";
import profileSlice from "./ProfileSlice";
import articlesSlice from "./ArticlesSlice";
import {useDispatch} from "react-redux";
import ArticlePageSlice from "./ArticlePageSlice";
import artileEditorSlice from "./ArtileEditorSlice";

export const store = configureStore({
  reducer: {
    tags: tagsSlice,
    app: appSlice,
    profile: profileSlice,
    articles: articlesSlice,
    articlePage: ArticlePageSlice,
    articleEditor: artileEditorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store

