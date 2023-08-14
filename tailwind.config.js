module.exports = {
  purge: ['./views/**/*.ejs'], 
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        "primary-800": "#3AB4F9",
        "primary-600": "#84D0FB",
        "primary-100": "#E6F6FE",
        "secondary-800": "#F97F3A",
        "secondary-600": "#FBAF84",
        "secondary-100": "#FEEFE6",
        "clr-900": "#272727"
      },
      display: ['group-hover'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}