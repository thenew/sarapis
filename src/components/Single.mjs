
import { colorsObjects } from "../helpers/utils.mjs";

const Single = ({query, item}) => {
  let data = item

  data.colorAccents = data.colors && data.colors.length && data.colors.filter(color => {
    let lightColorCodes = [...colorsObjects.white.colorsCodes, ...colorsObjects.yellow.colorsCodes]
    lightColorCodes = lightColorCodes.map(c => c.toLowerCase())
    const isLight = lightColorCodes.includes(color.toLowerCase())

    return !isLight
  }) || []

  return data
}

export default Single