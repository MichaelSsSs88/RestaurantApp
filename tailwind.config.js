/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/app/*.html",
    "./src/pages/**/*.html",
    "./src/components/**/*.html",
    "./src/**/*"
  ],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px',
    },
    extend: {
      colors:{
        main:'#CC9900',
        'color-primary-0':'#7A8D8D',
        'color-primary-1':'#008E8E',
        'color-primary-2':'#4E7E7E',
        'color-primary-3':'#B9BDBD',
        'color-primary-4':'#FFFFFF',
        second:{
          100:'#003300',
          200:'#339900'
        },
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

