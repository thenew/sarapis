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


export const colorsNames = {
  white: ['#fff'],
  black: ['#000'],
  red: ['#f00'],
  green: ['#0f0'],
  blue: ['#00f', '#039'],
  yellow: ['#ff0'],
}

// export const colorsNormalize = (name) => {
//   const colors = []
//   return colors
// }