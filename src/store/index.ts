import { configureStore } from "@reduxjs/toolkit";
import { fileshareApi } from "@/services/fileshare.service";
import fileShareReducer from "@/slice/fileshare";

export const store = configureStore({
	reducer: {
		[fileshareApi.reducerPath]: fileshareApi.reducer,
		fileShare: fileShareReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(fileshareApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
