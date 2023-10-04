import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/styles';
import { ClassNames } from '@emotion/react';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres'
import { useDispatch, useSele, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

const redLogo = "https://fontmeme.com/permalink/230131/45c088f2a28bb5d55ac2cf722c5fb413.png";
const blueLogo = "https://fontmeme.com/permalink/230131/bf29ab70c6ac7405de9b21d5ff352869.png";

const Sidebar = ({ setMobileOpen }) => {
    const { genreOrCategoryName } = useSelector((state)=> state.currentGenreOrCategory);
    const theme = useTheme();
    const classes = useStyles();
    const {data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();  
    return (
        <>
            <Link to="/" className={classes.imageLink}>
                <img
                    className={classes.image}
                    src={theme.palette.mode === "light" ? blueLogo : redLogo}
                    alt="MatoshMovies logo"
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to="/">
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                            {<ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                            </ListItemIcon> }
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>           
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching ? (
                    <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
                ) :   data.genres.map(({ name, id }) => (
                    <Link key={name} className={classes.links} to="/">
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                        <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                            <ListItemText primary={name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    );
};

export default Sidebar;