import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../api";
import {User, UserForLogin, UserForRegistration} from "../types/user";
import {SettingsFormValue} from "../types/form";
import axios from "axios";

interface AppState {
    user: User | null,
    isLoading: boolean,
    isAuth: boolean,
    formErrors: string
}

const initialState: AppState = {
    user: null,
    isLoading: false,
    isAuth: false,
    formErrors: ''
}

const appSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.formErrors = '';
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.formErrors = '';
                state.isAuth = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.formErrors = '';
                state.isAuth = true;
            })
            .addCase(signInUser.rejected, (state, action) => {
                if (action.payload) {
                   state.formErrors = action.payload;
                }
            })
    }

})


export const signUpUser = createAsyncThunk<User, UserForRegistration, {rejectValue: string}>(
    'appSlice/getUserProfile',
    async (formData, {rejectWithValue}) => {
        try {
            const {username, email, password} = formData;
            return await userAPI.signUp(username, email, password);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                return rejectWithValue(Object.keys(data).map(key => key + " " + data[key]).join(", ") as string)
            }
        }

    }
)


export const signInUser = createAsyncThunk<User, UserForLogin, {rejectValue: string}>(
    'appSlice/signInUser',
    async (formData, {rejectWithValue}) => {

        try {
            const {email, password} = formData;
            return await userAPI.signIn(email, password);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                return rejectWithValue(Object.keys(data).map(key => key + " " + data[key]).join(", ") as string)
            } else {
                return rejectWithValue("An error occurred while signing in");
            }
        }
    }
)

export const authUser = createAsyncThunk<User, undefined, {rejectValue: string}>(
    'appSlice/authUser',
    async (_,  {rejectWithValue}) => {
        try {
            return await userAPI.login();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data.errors;
                return rejectWithValue(Object.keys(data).map(key => key + " " + data[key]).join(", ") as string)
            } else {
                return rejectWithValue("An error occurred while signing in");
            }
        }
    }
)

export const updateUser = createAsyncThunk<User, SettingsFormValue>(
    'appSlice/updateUser',
    async (formData) => {
        return await  userAPI.updateSettings(formData);
    }
)

export const {logout} = appSlice.actions;
export default appSlice.reducer;


