/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        baseColor:'#FFC23C',
        background:'#2C3639',
      },
      fontFamily:{
        Signika: "'Signika', sans-serif",
        Teko: "'Teko', sans-serif",
        Righteous: "'Righteous', cursive;",
      },
      fontSize:{
         "xsm" :"11px",
         "2xsm" : "9px",
      },
      width : {
        "sb" : "95%",
        "seventy" : "70%",
        "thirty" : "30%",
      },
      screens:{
        '1460' : "1460px",
        '900' :"900px",
        '460' : "460px",
      },
    },
  },
  plugins: [],
}
