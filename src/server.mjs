/**
 * Create a HTTP server with Node.js
 */

import express from 'express'
import ExpressGA from 'express-universal-analytics'
import fs from "fs";
import { domain, dataPath } from "./helpers/config.mjs";

import Home from "./components/Home.mjs";
import Single from "./components/Single.mjs";

const app = express()
const port = 4200

app.set('view engine', 'ejs')

app.use(ExpressGA('UA-164644-X'));

// get Flags
const flagsCountries = JSON.parse(fs.readFileSync(`${dataPath}/flags-countries.json`))
Object.keys(flagsCountries).forEach(key => {
  flagsCountries[key].category = 'countries'
})
const flagsMaritime = JSON.parse(fs.readFileSync(`${dataPath}/flags-maritime.json`))
Object.keys(flagsMaritime).forEach(key => {
  flagsMaritime[key].category = 'maritime'
})
const flagsCommunities = JSON.parse(fs.readFileSync(`${dataPath}/flags-communities.json`))
Object.keys(flagsCommunities).forEach(key => {
  flagsCommunities[key].category = 'communities'
})
const flags = {...flagsMaritime, ...flagsCommunities, ...flagsCountries}

function rend(component) {
  return { data: component, domain: domain }
}

// Routes

app.get('/', function (req, res) {
  res.render('home', rend(Home({
    query: req.url.substring(1), // remove slash
    items: flags
  })))
})

app.get('/communities', function (req, res) {
  res.render('home', rend(Home({
    query: `?categories=communities`,
    items: flags
  })))
})

app.get('/maritime', function (req, res) {
  res.render('home', rend(Home({
    query: `?categories=maritime`,
    items: flags
  })))
})

app.get('/countries', function (req, res) {
  res.render('home', rend(Home({
    query: `?categories=countries`,
    items: flags
  })))
})

// single
Object.keys(flags).find(slug => {
  app.get(`/${slug}`, function (req, res) {
    res.render('single', rend(Single({
      query: req.query,
      item: flags[slug]
    })))
  })
})

// Statics

app.use(express.static('flags-svg/maritime-alphabet-flags-10by8'))
app.use(express.static('flags-svg/communities'))
app.use(express.static('flags-svg/countries'))
app.use(express.static('flags-svg/others'))

app.use('/public', express.static('public')) // assets

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})