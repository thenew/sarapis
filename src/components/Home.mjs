import fs from 'fs'
import path from 'path'
import parseUrl from 'parseUrl'
import { colorsNames } from '../helpers/utils.mjs'
import {  } from '../helpers/config.mjs'

const Home = ({request, items}) => {
  const search = parseUrl(request).search;
  let data = {}
  let flags = {}

  data.pageClass = 'home'

  // filters
  const params = new URLSearchParams(search)
  data.params = params

  // get params
  const filtersColorsNames = params.getAll('colors')
  const filtersNumberColors = params.getAll('number-colors').filter(function(number) { return typeof number === 'number'})
  const filtersSearch = params.get('search')

  if(search) {
    
    // get hexacodes colors
    let filtersColorsCodes = []
    filtersColorsNames.forEach(colorName => {
      filtersColorsCodes = filtersColorsCodes.concat(colorsNames[colorName])
    })
    
    // filter colors
    Object.keys(items).forEach(function(key){
      const flag = items[key]

      const hasColors = filtersColorsNames.length ? flag.colors.filter(flagColors => filtersColorsCodes.includes(flagColors)).length > 0 : true
      const hasNumberColors = filtersNumberColors.length ? filtersNumberColors.includes(flag.colors.length.toString()) : true
      const hasTitle = filtersSearch ? flag.title.match(new RegExp(filtersSearch,'i')) : true
      console.log('hasTitle: ', hasTitle)
      console.log('filtersNumberColors: ', filtersNumberColors)
      // console.log('hasColors: ', hasColors)
      // console.log('hasNumberColors: ', hasNumberColors)
console.log('hasColors && hasNumberColors && hasTitle: ', hasColors && hasNumberColors && hasTitle)
      // add
      if(hasColors && hasNumberColors && hasTitle) {
        console.log('add key: ', key)
        flags[key] = flag
      }
    })
  } else {
    flags = items
  }

  data.flags = flags
  return data
}

export default Home
