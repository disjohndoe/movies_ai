import React, {useState, useEffect} from 'react'
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import useStyles from './styles';

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    console.log('Search');

    const handleKeyPress = () => {

    }

  return (
    <div className='{classes.searchContainer'>
    <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant='standard'
        />
        </div>
  )
}

export default Search