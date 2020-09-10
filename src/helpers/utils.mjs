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
    colorsCodes: ['#fff', '#F4F5F0']
  },
  black: {
    label: 'Black',
    mainColorCode: '#000',
    dark: true,
    colorsCodes: ['#000', '#000000', '#2d2d2d']
  },
  pink: {
    label: 'Pink',
    mainColorCode: '#f7f',
    dark: false,
    colorsCodes: ['#f5a9b8']
  },
  red: {
    label: 'Red',
    mainColorCode: '#f00',
    dark: true,
    colorsCodes: ['#f00', '#ef4135', '#CE1126', '#e40303', '#da121a', '#ED192D', '#EF3340', '#CD212A']
  },
  orange: {
    label: 'Orange',
    mainColorCode: '#f70',
    dark: false,
    colorsCodes: ['#ff8c00']
  },
  yellow: {
    label: 'Yellow',
    mainColorCode: '#ff0',
    dark: false,
    colorsCodes: ['#ff0', '#ffed00', '#fcdd09', '#ffd800', '#fff433', '#FBDF21', '#FFF200', '#FDDA24']
  },
  green: {
    label: 'Green',
    mainColorCode: '#0f0',
    dark: false,
    colorsCodes: ['#0f0', '#008026', '#078930', '#00613C', '#008C45']
  },
  blue: {
    label: 'Blue',
    mainColorCode: '#00f',
    dark: true,
    colorsCodes: ['#00f', '#039', '#0055a4', '#002654', '#004dff', '#5bcefa', '#074EA2']
  },
  violet: {
    label: 'Violet',
    mainColorCode: '#707',
    dark: true,
    colorsCodes: ['#750787', '#7902aa', '#9b59d0']
  },
}

export const collectionTitles = {
  white: `No war White flag`,
  black: `Back to black flag`,
  red: `Red flag!`,
  orange: `Orange box`,
  yellow: `Yellow lemon`,
  green: `Super green`,
  blue: `Blue Monday`,
  violet: `Violet Rain`,
  maritime: `Maritime flags`,
  communities: `Communities flags`,
  countries: `Sovereign states flags`,
  1: `Monochrome`,
  2: `2 colors`,
  3: `3 colors`,
  4: `4 colors`,
  5: `5 colors`,
}