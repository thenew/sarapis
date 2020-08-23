/**
 * Utilities functions
 */

/**
 * @param {String} text
 */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/^\./, "dot-")
    .replace(/\.$/, "-dot")
    .replace(/\./g, "-dot-")
    .replace(/^&/, "and-")
    .replace(/&$/, "-and")
    .replace(/&/g, "-and-")
    .replace(/[ !:’']/g, "")
    .replace(/à|á|â|ã|ä/g, "a")
    .replace(/ç|č|ć/g, "c")
    .replace(/è|é|ê|ë/g, "e")
    .replace(/ì|í|î|ï/g, "i")
    .replace(/ñ|ň|ń/g, "n")
    .replace(/ò|ó|ô|õ|ö/g, "o")
    .replace(/š|ś/g, "s")
    .replace(/ù|ú|û|ü/g, "u")
    .replace(/ý|ÿ/g, "y")
    .replace(/ž|ź/g, "z");


export const colorsObjects = {
  white: {
    label: 'White',
    mainColorCode: '#fff',
    dark: false,
    colorsCodes: ['#fff']
  },
  black: {
    label: 'Black',
    mainColorCode: '#000',
    dark: true,
    colorsCodes: ['#000']
  },
  red: {
    label: 'Red',
    mainColorCode: '#f00',
    dark: true,
    colorsCodes: ['#f00', '#ef4135', '#CE1126']
  },
  green: {
    label: 'Green',
    mainColorCode: '#0f0',
    dark: false,
    colorsCodes: ['#0f0']
  },
  blue: {
    label: 'Blue',
    mainColorCode: '#00f',
    dark: true,
    colorsCodes: ['#00f', '#039', '#0055a4', '#002654']
  },
  yellow: {
    label: 'Yellow',
    mainColorCode: '#ff0',
    dark: false,
    colorsCodes: ['#ff0']
  },
}

// export const colorsNormalize = (name) => {
//   const colors = []
//   return colors
// }