import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { fetchToken } from '../Utils';
import { ColorModeContext } from '../Utils/ToggleColorMode';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory';

const useAlan = () => {
    const { setMode } = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        alanBtn({
            key: 'c250298bcf01b948f9edf5ea0df40b072e956eca572e1d8b807a3e2338fdd0dc/stage',            
            onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
                if (command === 'chooseGenre') {
                    
                    const foundGenre = genres.find((gen) => gen.name.toLowerCase() === genreOrCategory.toLowerCase());

                    if (foundGenre) {
                        history.push('/');
                        dispatch(selectGenreOrCategory(foundGenre.id));                        
                    }else {
                        // top rated upcoming popular
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                        history.push('/');
                        dispatch(selectGenreOrCategory(category));
                    }
                }
                else if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light');
                    } else {
                        setMode('dark'); 
                    }              
                } else if (command === 'login') {
                    fetchToken();
                    } else if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                    } else if (command === 'search') { 
                    dispatch(searchMovie(query));
                    }
            },
        });
    }, []);

    // The empty dependency array [] means this effect will run once after the initial render

    return null; // Assuming this component doesn't render anything
};

export default useAlan;