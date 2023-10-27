import React, { useState } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
  RemoveFromQueue,
  AddToQueue,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  useGetMoviePageQuery,
  useGetRecommedationsQuery,
} from "../../services/TMDB";
import { MovieList } from "..";

import genreIcons from "../../assets/genres";

import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import useStyles from "./styles";
import Movie from "../Movie/Movie";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, error, isFetching } = useGetMoviePageQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data: recommendations, isFetching: isRecommendationFetching } =
    useGetRecommedationsQuery({ list: "/recommendations", movie_id: id });

  const isMovieFavorited = false;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something went wrong, go back.</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data && data.title ? data.title + " poster" : ""}
        ></img>
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginTop: "1rem" }}
        >
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating
              readOnly
              value={data.vote_average / 2}
              precision={0.1}
              name="size-small"
              defaultValue={2}
              size="small"
              position="top"
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min /{" "}
            {data?.spoken_languages.length > 0
              ? `${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              className={classes.links}
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}{" "}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography
          color="textPrimary"
          variant="h5"
          gutterBottom
          style={{ marignTop: "10px" }}
        >
          Overview
        </Typography>
        <Typography style={{ marginTop: "1rem" }}>{data?.overview}</Typography>
        <Typography style={{ marginTop: "1rem" }} variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              .map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      item
                      container
                      xs={4}
                      md={2}
                      key={i}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character?.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
          <Grid item container style={{ marginTop: "2rem" }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    color="primary"
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    color="primary"
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonGroup size="medium" variant="outlined">
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button
                    onClick={addToWatchlist}
                    endIcon={
                      isMovieWatchlisted ? <RemoveFromQueue /> : <AddToQueue />
                    }
                  >
                    Watchlist
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{
                      borderColor: "primary.main",
                    }}
                  >
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="subtitle1"
                      style={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/* Might add similarMovies feature instead of Typography msg */}
      <Box marginTop="2rem" align="center">
        <Typography variant="h5" gutterBottom>
          Similar Movies You Might Like
        </Typography>
        {recommendations ? (
          recommendations.results && recommendations.results.length === 0 ? (
            <Typography variant="h6" gutterBottom>
              Sorry, nothing to recommend.
              <Typography
                gutterBottom
                style={{ fontStyle: "italic", fontSize: "12px" }}
              >
                (The movie is might be new, and/or there is no IMDB data
                available currently. Check back shortly!)
              </Typography>
            </Typography>
          ) : (
            <MovieList movies={recommendations} numberOfMovies={12} />
          )
        ) : (
          <Typography gutterBottom variant="h6" align="center">
            Loading...
          </Typography>
        )}
      </Box>
      <Modal
        closedaftertransition="true"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        <>
          {data?.videos?.results.length > 0 && (
            <iframe
              className={classes.video}
              autoPlay
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </>
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
