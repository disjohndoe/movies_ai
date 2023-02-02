import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({

        // Get Genres
        GetGenre: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),
    }),
})
export const { useGetGenreQuery } = tmdbApi;