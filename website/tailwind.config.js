/* eslint-disable prettier/prettier */
import { nextui } from '@nextui-org/theme'
import { withUt } from "uploadthing/tw";

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        colorChange: '  0% { color: white; } 33% { color: yellow; } 66% { color: orange; } 100% { color: white; }'
      },
      gridTemplateColumns: {
        '4-auto': 'repeat(4, auto);'
      },
      colors: {
        purpleCs: 'rgb(200, 80, 192)',
        blueCs: 'rgb(65, 88, 208)',
        borderNextUI: 'rgba(0, 0, 0, 0.15)'
      },
      boxShadow: {
        custom: '0px 0px 5px 5px #94a3b8',
        innerset: 'inset 0px 5px 10px rgba(0, 0, 0, 0.2)',
        scrowview: '0px -70px 100px rgba(0, 0, 0, 1) inset'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
})
