import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        //* Get Genres
        GetGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
                    }),
        
        //* Get Movie
        GetMovie: builder.query({
            query: ({ genreIDOrCategoryName, page, searchQuery}) => {
            //* Get Movies by Search
            if (searchQuery){
                return `search/movie?api_key=${tmdbApiKey}&query=${searchQuery}`;
            }
            //* Get Movies by Category
            if (genreIDOrCategoryName && typeof genreIDOrCategoryName === 'string') {
                return `movie/${genreIDOrCategoryName}?api_key=${tmdbApiKey}&page=${page}`;
            }
            // Get Movies by Genre
            if (genreIDOrCategoryName && typeof genreIDOrCategoryName === 'number') {
                return `discover/movie?api_key=${tmdbApiKey}&with_genres=${genreIDOrCategoryName}&page=${page}`;
                
            }
            // Get Popular Movies
            return `movie/popular?api_key=${tmdbApiKey}&page=${page}`
            }

        }),

        //* Get Movie
        getMoviePage: builder.query({
            query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        //* Get User Specific Movie Lists
        getRecommedations: builder.query({
      query: ({ movie_id, list }) => `movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),
}),
});

export const { 
    useGetMovieQuery,
    useGetGenresQuery,
    useGetMoviePageQuery,
    useGetRecommedationsQuery,
} = tmdbApi;
