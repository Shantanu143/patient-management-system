/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(50,24,13,1) 100%)',
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
