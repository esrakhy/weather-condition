import { createSlice } from "@reduxjs/toolkit";

// -------------------------------------------
const initialState = {
    latitude: 41.0395362238216,
    longitude: 28.968493796068607,
};

const slice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLatitude: (state, action) => {
            state.latitude = action.payload;
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload;
        },
    },
});
// Actions
export const { setLatitude, setLongitude } = slice.actions;
// Reducer
export default slice.reducer;