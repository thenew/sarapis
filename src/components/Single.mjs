
const Single = ({query, item}) => {
  let data = item

  data.colorAccents = data.colors && data.colors.length && data.colors.filter(color => !color.toLowerCase().includes('fff')) || []

  return data
}

export default Single