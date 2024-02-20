import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tagsAPI} from "../api";

interface TagsState {
    tags: null | string[],
    isLoading: boolean
}

const initialState:TagsState = {
    tags: null,
    isLoading: false
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTags.fulfilled, (state, action) => {
                state.tags = action.payload;
            })
    }
})

export const loadTags = createAsyncThunk<string[]>(
    'tags/loadTags',
    async function() {
        return await tagsAPI.getTags();
    }
)
export default tagsSlice.reducer;