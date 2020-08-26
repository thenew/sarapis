import fs from "fs";
import path from "path";
import parseUrl from "parseUrl";
import { colorsObjects, collectionTitles } from "../helpers/utils.mjs";
import {} from "../helpers/config.mjs";

const Home = ({ request, items: allFlags }) => {
  const search = parseUrl(request).search;
  let data = {};
  let flags = {};

  data.pageClass = "home";

  // filters
  const params = new URLSearchParams(search);
  data.params = params;

  // building filters
  const filtersValues = {
    categories: [],
    colors: [],
    numberColors: [],
    ratios: [],
    collectionTitle: ``,
  }

  // get params
  const filtersCategories = params.getAll("categories");
  const filtersColorsNames = params.getAll("colors");
  const filtersRatios = params.getAll("ratios");
  const filtersSearch = params.get("search");
  const filtersNumberColors = params.getAll("number-colors").filter(function (number) {
    return !isNaN(number)
  });
  const hasFilters = filtersCategories.length || filtersColorsNames.length || filtersRatios.length || filtersNumberColors.length || filtersSearch
  if(filtersColorsNames.length === 1 && ! filtersCategories.length && ! filtersNumberColors.length && ! filtersRatios.length && ! filtersSearch) {
    filtersValues.collectionTitle = collectionTitles[filtersColorsNames[0]] || filtersColorsNames[0]

  } else if (filtersCategories.length === 1 && ! filtersColorsNames.length && ! filtersNumberColors.length && ! filtersRatios.length && ! filtersSearch) {
    filtersValues.collectionTitle = collectionTitles[filtersCategories[0]] || filtersCategories[0]

  } else if (filtersNumberColors.length === 1 && ! filtersCategories.length && ! filtersColorsNames.length && ! filtersRatios.length && ! filtersSearch) {
    filtersValues.collectionTitle = collectionTitles[filtersNumberColors[0]] || filtersNumberColors[0]
  
  } else if ( filtersRatios.length === 1 && ! filtersNumberColors.length && ! filtersCategories.length && ! filtersColorsNames.length && ! filtersSearch) {
    filtersValues.collectionTitle = collectionTitles[filtersRatios[0]] || filtersRatios[0]

  } else if ( filtersSearch && ! filtersRatios.length && ! filtersNumberColors.length && ! filtersCategories.length && ! filtersColorsNames.length) {
    filtersValues.collectionTitle = collectionTitles[filtersSearch] || filtersSearch
  }

  // get hexacodes colors
  let filtersColorsCodes = [];
  filtersColorsNames.forEach((colorName) => {
    const {colorsCodes = []} = colorsObjects[colorName] || {}
    filtersColorsCodes = filtersColorsCodes.concat(colorsCodes)
  })

  Object.keys(allFlags).forEach(function (key) {
    const flag = allFlags[key];
    const {
      colors: flagColors = [],
      title: flagTitle = ``,
      category: flagCategory = ``,
      ratios: flagRatios = []
    } = flag;
    const flagNumberColors = flagColors.length.toString()

    if (hasFilters) {

      const hasCategory = filtersCategories.length ? filtersCategories.includes(flagCategory) : true
      const hasColors = filtersColorsCodes.length ? flagColors.filter((flagColor) => filtersColorsCodes.includes(flagColor)).length > 0 : true
      const hasRatios = filtersRatios.length ? flagRatios.filter((flagRatio) => filtersRatios.includes(flagRatio)).length > 0 : true
      const hasNumberColors = filtersNumberColors.length ? filtersNumberColors.includes(flagNumberColors) : true
      const hasTitle = filtersSearch ? flagTitle.match(new RegExp(filtersSearch, "i")) : true

      // console.log('hasCategory: ', hasCategory)
      // console.log('hasColors: ', hasColors)
      // console.log('hasNumberColors: ', hasNumberColors)

      // add
      if (hasCategory && hasColors && hasNumberColors && hasRatios && hasTitle) {
        // console.log('add flag key: ', key)
        flags[key] = flag
      }
    } else {
      flags[key] = flag
    }
    
    // Add all categories in the filters
    if( ! filtersValues.categories.includes(flagCategory) ) {
      filtersValues.categories.push(flagCategory)
    }

  })


  // build smart filters
  Object.keys(flags).forEach(key => {
    const flag = flags[key]
    const {
      category: flagCategory = ``,
      colors: flagColors = [],
      ratios: flagRatios = []
    } = flag;
    const flagNumberColors = flagColors.length.toString()

    // colors
    flagColors.forEach(function(flagColor) {
      // get filter name of the color
      Object.keys(colorsObjects).forEach(function(name) {
        const colorObject = colorsObjects[name]
        const {colorsCodes = []} = colorObject
        if(colorsCodes.includes(flagColor) 
        && ! Object.keys(filtersValues.colors).includes(name) ) {
          filtersValues.colors[name] = colorObject
        }
      })
    })

    // number of colors
    if( ! filtersValues.numberColors.includes(flagNumberColors) ) {
      filtersValues.numberColors.push(flagNumberColors)
    }

    // ratios
    flagRatios.forEach(function(flagRatio) {
      if( ! filtersValues.ratios.includes(flagRatio) ) {
        filtersValues.ratios.push(flagRatio)
      }
    })
  }) 

  // sort filters colors values
  const unSortedFiltersValuesColors = filtersValues.colors
  const filtersValuesColors = []
  Object.keys(colorsObjects).forEach(key => {
    Object.keys(unSortedFiltersValuesColors).forEach(k => {
      if(k == key) {
        filtersValuesColors[k] = unSortedFiltersValuesColors[k]
      }
    })
  })
  filtersValues.colors = filtersValuesColors

  // sort number of colors
  filtersValues.numberColors.sort()

  data.filtersValues = filtersValues;

  data.flags = flags;
  return data;
};

export default Home;
