import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createTheme, MantineProvider } from '@mantine/core';
// Order seems to matter. If Mantine is imported after tailwind, the tailwind class passed with className is not applied.
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  /** Put your mantine theme override here */
  //focusRing:"never",
  fontFamily:"Poppins, sans-serif",
  headings:{
    fontFamily:"Merriweather, serif"
  },
  colors:{
    primary: ['#f1fcfa', '#cff8ef', '#9ff0e1', '#67e1cf', '#32b9a9', '#1fad9f', '#168b82', '#166f69', '#165955', '#174a47', '#072c2b'],    
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#000000',]
  },
  primaryColor:"primary",
  primaryShade:4,//#32b9a9
  defaultGradient:{
    from:"primary.4",
    to:"primary.8",
    deg:132
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <Notifications 
      position="top-center" 
      zIndex={9999} 
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md pointer-events-none"
    />
    <App />
  </MantineProvider>,
);
