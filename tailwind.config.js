/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5054bf',
        'secondary':'#111827',
        'hoverWhite' :'#E0DFD6',
        'blockButton' : '#02020A',
        'blockButtonHover' :'#172056',
        'hoverCards' : 'rgba(30, 37, 52, 0.6)',
        'blanco' : '#ffffff',
        
      }
    },
  },
  plugins: [],
}