import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FileshareState } from "@/slice/fileshare";

export interface ApiStatusResponse {
	status: number;
	message: string;
}

export const acceptedFileFormats = new Set([
	"application/pdf",
	"application/zip",
	"image/*",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"text/*",
	"application/epub+zip",
	"application/vnd.oasis.opendocument.text",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const isValidFileType = (type: string): boolean => {
	return Array.from(acceptedFileFormats).some(
		(format) =>
			type === format ||
			(format.endsWith("/*") && type.startsWith(format.slice(0, -1)))
	);
};

export const fileshareApi = createApi({
	reducerPath: "fileshareApi",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	endpoints: (builder) => ({
		getApiStatus: builder.query<ApiStatusResponse, void>({
			query: () => ({
				url: "status",
			}),

			transformResponse: (response: { data: ApiStatusResponse }) =>
				response.data,
		}),
		uploadFile: builder.mutation<FileshareState, FormData>({
			query: (data) => ({
				url: "upload",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useUploadFileMutation, useGetApiStatusQuery } = fileshareApi;
