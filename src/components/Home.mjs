import fs from "fs";
import path from "path";
import parseUrl from "parseUrl";
import { colorsObjects } from "../helpers/utils.mjs";
import {} from "../helpers/config.mjs";

const Home = ({ request, items }) => {
  const search = parseUrl(request).search;
  let data = {};
  let flags = {};

  data.pageClass = "home";

  // filters
  const params = new URLSearchParams(search);
  data.params = params;

  // building filters
  const filtersValues = {
    colors: [],
    numberColors: [],
  }

  // get params
  const filtersColorsNames = params.getAll("colors");
  const filtersNumberColors = params.getAll("number-colors").filter(function (number) {
    console.log('typeof number: ', typeof number)
    return !isNaN(number)
  });
  const filtersSearch = params.get("search");

  if (search) {
    // get hexacodes colors
    let filtersColorsCodes = [];
    filtersColorsNames.forEach((colorName) => {
      filtersColorsCodes = filtersColorsCodes.concat(colorsObjects[colorName].colorsCodes);
    });

    // filter colors
    Object.keys(items).forEach(function (key) {
      const flag = items[key];
      const { colors: flagColors = [], title: flagTitle = `` } = flag;
      const flagNumberColors = flagColors.length.toString()

      const hasColors = filtersColorsNames.length ? flagColors.filter((flagColors) => filtersColorsCodes.includes(flagColors)).length > 0 : true;
      const hasNumberColors = filtersNumberColors.length ? filtersNumberColors.includes(flagNumberColors) : true;
      const hasTitle = filtersSearch ? flagTitle.match(new RegExp(filtersSearch, "i")) : true;

      // add
      if (hasColors && hasNumberColors && hasTitle) {
        
        flags[key] = flag;

        // add values to filters
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
      }
    });
  } else {
    flags = items;
  }

  // clean filters values
  filtersValues.numberColors.sort()
  data.filtersValues = filtersValues;


  data.flags = flags;
  return data;
};

export default Home;
