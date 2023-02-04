import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({

        // Get Movie
        GetMovie: builder.query({
            query: () => `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`,
        }),
    }),
})
export const { useGetMovieQuery } = tmdbApi;