module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'extra-sm': '375px',
        sm: '500px',
      },
    },
    backgroundImage: {
      wave: "url('./src/img/wave-haikei.png')",
    },
  },
  plugins: [],
};
