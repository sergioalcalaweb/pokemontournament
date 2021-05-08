import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#309eb9',      
    },
    secondary: {
      main: '#E8BF4D',
    },
    error: {
      main: red.A400,
    },
  },  
  typography: {    
    subtitle1: {
      fontSize: 30,
      fontWeight: 300
    },
    subtitle2: {
      fontSize: 24,
      fontWeight: 300
    },
    body1: {
      fontWeight: 300
    }
  },
});

export default theme;