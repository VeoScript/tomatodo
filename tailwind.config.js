// tailwind.config.js
import { plugin } from 'twrnc';

module.exports = {
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'ghost-white': '#dbe8fb',
        'gray': '#8b939f',
        'purple': '#617cf2',
        'dark-purple': '#1c2548',
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({  
        'font-railway-regular': {
          fontFamily: 'Raleway-Regular'
        },
        'font-railway-italic': {
          fontFamily: 'Raleway-Italic'
        },
        'font-railway-bold': {
          fontFamily: 'Raleway-Bold'
        },
        'font-railway-black': {
          fontFamily: 'Raleway-Black'
        },

        'btn-icon': `p-1.5 rounded-full shadow-2xl bg-white bg-opacity-60`,
        'btn-primary': `flex-row items-center justify-center w-full my-1 p-3 rounded-xl bg-purple`,
        'btn-primary-disabled': `flex-row items-center justify-center w-full my-1 p-3 rounded-xl bg-purple bg-opacity-50`,
        'search-body': 'flex-row items-center w-full my-2 px-3 rounded-xl shadow-sm bg-white',
        'search-input': `flex-1 w-full p-3 text-base text-neutral-600 font-railway-regular`,
      });
    }),
  ]
}
