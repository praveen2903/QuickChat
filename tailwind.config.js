// eslint-disable-next-line no-undef
const withMT = require("@material-tailwind/react/utils/withMT");
 
// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary-light': '#F7F8FC',
				'secondary-light': '#FFFFFF',
				'ternary-light': '#f6f7f8',

				'primary-dark': '#0D2438',
				'secondary-dark': '#102D44',
				'ternary-dark': '#1E3851',
      },
      container: {
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '5rem',
					xl: '6rem',
					'2xl': '8rem',
				},
			},
      boxShadow: {
        '3xl': '0px 10px 50px 0px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "night"],
  },
});