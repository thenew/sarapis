import fs from 'fs'
import path from 'path'
import {  } from '../helpers/utils.mjs'
import {  } from '../helpers/config.mjs'

const Home = ({request, items}) => {
  let data = {flags: items}

  data.pageClass = 'home'

  return data
}

export default Home
