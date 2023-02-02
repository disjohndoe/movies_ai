import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from '@mui/styles';
import { ClassNames } from '@emotion/react';
import useStyles from './styles';


const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top rated", value: "top-rated" },
    { label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
    { label: "Action", value: "action" },
    { label: "Comedy", value: "comedy" },
    { label: "Horror", value: "horror" },
    { label: "Animation", value: "animation" },
];



const redLogo = "https://fontmeme.com/permalink/230131/45c088f2a28bb5d55ac2cf722c5fb413.png";
const blueLogo = "https://fontmeme.com/permalink/230131/bf29ab70c6ac7405de9b21d5ff352869.png";

const Sidebar = ({ setMobileOpen }) => {
    const theme = useTheme();
    const classes = useStyles();
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
                <ListSubheader>Genres</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to="/">
                        <ListItem onClick={() => { }} button>
                            {/* <ListItemIcon>
                                <img src={redLogo} className={classes.genreImages} height={30} />
                            </ListItemIcon> */}
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {demoCategories.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to="/">
                        <ListItem onClick={() => { }} button>
                            {/* <ListItemIcon>
                                <img src={redLogo} className={classes.genreImages} height={30} />
                            </ListItemIcon> */}
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>

        </>
    );
};

export default Sidebar;