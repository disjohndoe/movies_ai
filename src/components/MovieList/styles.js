import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => (
    {
 moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
   //  alignContent: "center",   
    flexShrink: "0",    
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      marginLeft: "2.8rem",
    },
 }
    }));