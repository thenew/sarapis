import fs from "fs";
import { colorsObjects, collectionTitles } from "../helpers/utils.mjs";
import {} from "../helpers/config.mjs";

const Home = ({ query, items: allFlags, continents = [] }) => {
  let data = {};
  let flags = {};

  data.pageClass = "home";

  // filters
  const params = new URLSearchParams(query);
  data.params = params;

  // building filters
  const filtersValues = {
    categories: [],
    colors: [],
    numberColors: [],
    ratios: [],
    collections: [],
    collectionTitle: ``,
  };

  // get params
  const filtersCategories = params.getAll("categories");
  const filtersColorsNames = params.getAll("colors");
  const filtersRatios = params.getAll("ratios");
  const filtersSearch = params.get("search");
  const filtersNumberColors = params
    .getAll("number-colors")
    .filter(function (number) {
      return !isNaN(number);
    });

  // conditional filters
  const filtersContinents = params.getAll("continents");
  const filtersGroups = params.getAll("groups");

  const hasFilters =
    filtersCategories.length ||
    filtersColorsNames.length ||
    filtersRatios.length ||
    filtersNumberColors.length ||
    filtersSearch;

  if (
    filtersColorsNames.length &&
    !filtersCategories.length &&
    !filtersNumberColors.length &&
    !filtersRatios.length &&
    !filtersSearch
  ) {
    filtersValues.collectionTitle =
      collectionTitles[filtersColorsNames.join("")] ||
      filtersColorsNames.join(" & ");
  } else if (
    filtersCategories.length === 1 &&
    !filtersColorsNames.length &&
    !filtersNumberColors.length &&
    !filtersRatios.length &&
    !filtersSearch
  ) {
    filtersValues.collectionTitle =
      collectionTitles[filtersCategories[0]] || filtersCategories[0];
  } else if (
    filtersNumberColors.length === 1 &&
    !filtersCategories.length &&
    !filtersColorsNames.length &&
    !filtersRatios.length &&
    !filtersSearch
  ) {
    filtersValues.collectionTitle =
      collectionTitles[filtersNumberColors[0]] || filtersNumberColors[0];
  } else if (
    filtersRatios.length === 1 &&
    !filtersNumberColors.length &&
    !filtersCategories.length &&
    !filtersColorsNames.length &&
    !filtersSearch
  ) {
    filtersValues.collectionTitle =
      collectionTitles[filtersRatios[0]] || filtersRatios[0];
  } else if (
    filtersSearch &&
    !filtersRatios.length &&
    !filtersNumberColors.length &&
    !filtersCategories.length &&
    !filtersColorsNames.length
  ) {
    filtersValues.collectionTitle =
      collectionTitles[filtersSearch] || filtersSearch;
  }

  // get hexacodes colors
  let filtersColorsCodes = [];
  filtersColorsNames.forEach((colorName) => {
    const { colorsCodes = [] } = colorsObjects[colorName] || {};
    filtersColorsCodes = filtersColorsCodes.concat(colorsCodes);
  });

  // filters the flags items
  Object.keys(allFlags).forEach(function (key) {
    const flag = allFlags[key];
    const {
      colors: flagColors = [],
      title: flagTitle = ``,
      category: flagCategory = ``,
      ratios: flagRatios = [],
      continent: flagContinent = ``,
      groups: flagGroups = [],
      variantOf = false,
    } = flag;

    // filter out variants
    if (variantOf) {
      return;
    }

    const flagNumberColors = flagColors.length.toString();

    if (hasFilters) {
      const matchCategories = filtersCategories.length
        ? filtersCategories.includes(flagCategory)
        : true;
      const matchColors = filtersColorsCodes.length
        ? flagColors.filter((flagColor) =>
            filtersColorsCodes.includes(flagColor)
          ).length > 0
        : true;
      const matchRatios = filtersRatios.length
        ? flagRatios.filter((flagRatio) => filtersRatios.includes(flagRatio))
            .length > 0
        : true;
      const matchNumberColors = filtersNumberColors.length
        ? filtersNumberColors.includes(flagNumberColors)
        : true;
      const matchTitle = filtersSearch
        ? flagTitle.match(new RegExp(filtersSearch, "i"))
        : true;
      const matchContinents = filtersContinents.length
        ? filtersContinents.includes(flagContinent)
        : true;
      const matchGroups = filtersGroups.length
        ? flagGroups.filter((flagGroup) => filtersGroups.includes(flagGroup))
            .length > 0
        : true;
      // console.log('flagGroups: ', flagGroups)
      // console.log('matchGroups: ', matchGroups)

      const match =
        matchCategories &&
        matchColors &&
        matchRatios &&
        matchNumberColors &&
        matchTitle &&
        matchContinents &&
        matchGroups;
      // console.log('match: ', match)
      // add
      if (match) {
        // console.log('add flag key: ', key)
        flags[key] = flag;
      }
    } else {
      flags[key] = flag;
    }

    // Add all categories in the filters
    if (!filtersValues.categories.includes(flagCategory)) {
      filtersValues.categories.push(flagCategory);
    }
  });

  // build smart filters
  Object.keys(flags).forEach((key) => {
    const flag = flags[key];
    const {
      category: flagCategory = ``,
      colors: flagColors = [],
      ratios: flagRatios = [],
      continent: flagContinent = ``,
      groups: flagGroups = [],
    } = flag;
    const flagNumberColors = flagColors.length.toString();

    // colors
    flagColors.forEach(function (flagColor) {
      // get filter name of the color
      Object.keys(colorsObjects).forEach(function (name) {
        const colorObject = colorsObjects[name];
        const { colorsCodes = [] } = colorObject;
        if (
          colorsCodes.includes(flagColor) &&
          !Object.keys(filtersValues.colors).includes(name)
        ) {
          filtersValues.colors[name] = colorObject;
        }
      });
    });

    // number of colors
    if (!filtersValues.numberColors.includes(flagNumberColors)) {
      filtersValues.numberColors.push(flagNumberColors);
    }

    // ratios
    flagRatios.forEach(function (flagRatio) {
      if (!filtersValues.ratios.includes(flagRatio)) {
        filtersValues.ratios.push(flagRatio);
      }
    });

    // conditional filters
    if (filtersCategories.includes("countries")) {
      // populate the continents filters
      if (flagContinent) {
        if (typeof filtersValues.continents === `undefined`) {
          filtersValues.continents = [];
        }
        if (!filtersValues.continents.includes(flagContinent)) {
          filtersValues.continents.push(flagContinent);
        }
      }

      // populate the groups filters
      flagGroups.forEach(function (flagGroup) {
        if (typeof filtersValues.groups === `undefined`) {
          filtersValues.groups = [];
        }
        if (!filtersValues.groups.includes(flagGroup)) {
          filtersValues.groups.push(flagGroup);
        }
      });
    }

    if (!filtersValues.numberColors.includes(flagNumberColors)) {
      filtersValues.numberColors.push(flagNumberColors);
    }
  });

  // sort filters colors values
  const unSortedFiltersValuesColors = filtersValues.colors;
  const filtersValuesColors = [];
  Object.keys(colorsObjects).forEach((key) => {
    Object.keys(unSortedFiltersValuesColors).forEach((k) => {
      if (k == key) {
        filtersValuesColors[k] = unSortedFiltersValuesColors[k];
      }
    });
  });
  filtersValues.colors = filtersValuesColors;

  // sort number of colors
  filtersValues.numberColors.sort();

  data.filtersValues = filtersValues;

  data.flags = flags;

  // all flags
  data.flagsWire = [];
  Object.keys(data.flags).forEach((key) => {
    let { src: flagSrc = `` } = data.flags[key];
    if (!flagSrc) return false;
    flagSrc = flagSrc.replace("../", "./");
    let flagSvg = fs.readFileSync(flagSrc).toString() || ``;

    // stroked it
    flagSvg = flagSvg.replace(/fill="#/gi, 'stroke="#');

    // avoid id conflicts
    flagSvg = flagSvg.replace(/id="/gi, 'id="srp-wire-');

    data.flagsWire.push(flagSvg);
  });

  data.hasFilters = hasFilters;
  return data;
};

export default Home;
