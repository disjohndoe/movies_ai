import { makeStyles } from "@mui/styles";

export default makeStyles(() => (
    {
        root: {
            display: 'flex',            
        },
        toolbar: {
            height: '70px',            
        },
        content: {
            flexGrow: 0,
            padding: '1em',
            width: '100%',
        },
    }
));