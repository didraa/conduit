import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {profileAPI} from "../api";
import {Profile} from "../types/profile";
import {Article} from "../types/article";


interface ProfileState {
    currentUser: null | Profile,
    articles: null | Article[],
    isLoading: boolean,
}

const initialState: ProfileState = {
    currentUser: null,
    articles: null,
    isLoading: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(followUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoading = false;
            })


    }

})


export const followUser = createAsyncThunk<Profile, string>(
    'profile/followUser',
    async (username) => {
        return await profileAPI.follow(username);
    }
)

export const unfollowUser = createAsyncThunk<Profile, string>(
    'profile/unfollowUser',
    async  (username) => {
        return await profileAPI.unfollow(username);
    }
)

export const getUserProfile = createAsyncThunk<Profile, string>(
    'profile/getUserProfile',
    async (username) => {
        return await profileAPI.getProfile(username);
    }
)



export default profileSlice.reducer;


