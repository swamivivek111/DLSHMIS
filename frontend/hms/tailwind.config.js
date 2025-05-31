/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { 
    extend: {
      fontFamily:{
        body:'Poppins, sans-serif',
        sans:'Poppins, sans-serif',
        heading:'Merriweather, serif'
      },
      colors:{
        'dark': "#212529",
        'light': "#F0F3FB",

        /*primary: {
          '50': '#f1fcfa',
          '100': '#cff8ef',
          '200': '#9ff0e1',
          '300': '#67e1cf',
          '400': '#32b9a9',
          '500': '#1fad9f',
          '600': '#168b82',
          '700': '#166f69',
          '800': '#165955',
          '900': '#174a47',
          '950': '#072c2b',
        },*/
        primary: {
          '50':  '#e7eaf1',
          '100': '#c3c9db',
          '200': '#9da7c3',
          '300': '#7685aa',
          '400': '#556896',
          '500': '#3d4d7a', // Slightly lighter than your base
          '600': '#2e3b60',
          '700': '#25304f',
          '800': '#1e263f',
          '900': '#171d30', // Near-black
          'DEFAULT': '#202A44', // Your actual base
        },
        'neutral': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#000000',
        },
  
      }
    } 
  },
  plugins: [],
};
