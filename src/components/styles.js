import { makeStyles } from "@mui/styles";

export default makeStyles(() => (
    {
        root: {
            display: 'flex',
            alignItems: 'center',            
        },
        toolbar: {
            height: '70px',            
        },
        content: {
            flexGrow: 0,
            padding: '2em',
            width: '100%',
        },
    }
));