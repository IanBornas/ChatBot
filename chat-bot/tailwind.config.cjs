module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // lighter pink background for light theme
        background: '#f7e6ea',
        // darker purple for dark theme / accent
        'background-dark': '#40284f',
        foreground: '#2d1b33',
        'foreground-dark': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
