// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {userAPI} from "../api";
//
//
// const settingsSlice = createSlice({
//     name: 'settings',
//     initialState: {
//         currentUser: null,
//         isLoading: false,
//     },
//
//     reducers: {
//         logoutUser(state) {
//             state.currentUser = null;
//         }
//     },
//
// })
//
// export const updateUser = createAsyncThunk<>(
//     'settings/updateUser',
//     async (formData) => {
//         const {username, email, password} = formData;
//         const response = await userAPI.signUp(username, email, password);
//         return response.data;
//     }
// )
//
//
// export const {logoutUser} = settingsSlice.actions;
// export default settingsSlice.reducer;
//

