/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to top, rgba(13, 13, 13, 1) 0%, rgba(50, 115, 45, 1) 100%)',
        'card-gradient':
          'radial-gradient(at top right, rgba(13, 13, 13, 1) 0%, rgba(34, 85, 34, 1) 100%)',
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
