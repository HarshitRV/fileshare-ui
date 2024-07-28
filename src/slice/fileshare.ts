import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FileshareState {
	message: string;
	longurl: string;
	shorturl: string;
	isProtected: boolean;
    existingFile: boolean;
}

const initialState: FileshareState = {
	message: "",
	longurl: "",
	shorturl: "",
	isProtected: false,
    existingFile: false,
};

const fileShareSlice = createSlice({
	name: "fileshare",
	initialState,
	reducers: {
		setFileshareData: (state, action: PayloadAction<FileshareState>) => {
			state.message = action.payload.message;
			state.longurl = action.payload.longurl;
			state.shorturl = action.payload.shorturl;
			state.isProtected = action.payload.isProtected;
            state.existingFile = action.payload.existingFile;
		},
		clearFileshareData: (state) => {
			Object.assign(state, initialState);
		},
	},
	selectors: {
		selectFileshareData: (state) => state,
	},
});

export const { clearFileshareData, setFileshareData } = fileShareSlice.actions;
export const { selectFileshareData } = fileShareSlice.selectors;
export default fileShareSlice.reducer;
