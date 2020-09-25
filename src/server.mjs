/**
 * Create a HTTP server with Node.js
 */

import express from "express";
import fs from "fs";
import { domain, dataPath } from "./helpers/config.mjs";

import Home from "./components/Home.mjs";
import About from "./components/About.mjs";
import Single from "./components/Single.mjs";

const app = express();
const port = 4200;

app.set("view engine", "ejs");

// get Flags
const flagsCountries = JSON.parse(
  fs.readFileSync(`${dataPath}/flags-countries.json`)
);
Object.keys(flagsCountries).forEach((key) => {
  flagsCountries[key].category = "countries";
});
const flagsMaritime = JSON.parse(
  fs.readFileSync(`${dataPath}/flags-maritime.json`)
);
Object.keys(flagsMaritime).forEach((key) => {
  flagsMaritime[key].category = "maritime";
});
const flagsCommunities = JSON.parse(
  fs.readFileSync(`${dataPath}/flags-communities.json`)
);
Object.keys(flagsCommunities).forEach((key) => {
  flagsCommunities[key].category = "communities";
});
const flagsUnordered = {
  ...flagsMaritime,
  ...flagsCommunities,
  ...flagsCountries,
};
const flags = {};
Object.keys(flagsUnordered)
  .sort()
  .forEach(function (key) {
    flags[key] = flagsUnordered[key];
  });

const continents = JSON.parse(fs.readFileSync(`${dataPath}/continents.json`));

function rend(component) {
  return { data: component, domain: domain, pageClass: "" };
}

// Routes

app.get("/", function (req, res) {
  res.render(
    "home",
    rend(
      Home({
        query: req.url.substring(1), // remove slash
        items: flags,
        continents: continents,
      })
    )
  );
});

app.get("/communities", function (req, res) {
  res.render(
    "home",
    rend(
      Home({
        query: `?categories=communities`,
        items: flags,
      })
    )
  );
});

app.get("/maritime", function (req, res) {
  res.render(
    "home",
    rend(
      Home({
        query: `?categories=maritime`,
        items: flags,
      })
    )
  );
});

app.get("/countries", function (req, res) {
  res.render(
    "home",
    rend(
      Home({
        query: `?categories=countries`,
        items: flags,
      })
    )
  );
});

// Page
// About
app.get(`/page/about`, function (req, res) {
  res.render(
    "about",
    rend(
      About({
        query: req.query,
      })
    )
  );
});

// single
Object.keys(flags).find((slug) => {
  app.get(`/${slug}`, function (req, res) {
    const flag = flags[slug];
    const { variants = [], variantOf: parentSlug = `` } = flag;

    if (variants && variants.length) {
      flag.variants = variants.map((variant) => {
        // if variants is still just the slug, add the full variant object
        if (typeof variant === "string") {
          const variantSlug = variant;
          const item = flags[variantSlug];
          item.slug = variantSlug;
          return item;
        } else {
          return variant;
        }
      });
    }

    // add parent flag to variants for single flag
    if (parentSlug) {
      const item = flags[parentSlug];
      item.slug = parentSlug;
      flag.variants = [item];
    }
    res.render(
      "single",
      rend(
        Single({
          query: req.query,
          item: flag,
        })
      )
    );
  });
});

// Statics

app.use("/", express.static("public/flags-svg/countries"));
app.use("/", express.static("public/flags-svg/maritime"));
app.use("/", express.static("public/flags-svg/communities"));
app.use("/", express.static("public/flags-svg/others"));
app.use("/manifest.webmanifest", express.static("public/manifest.webmanifest"));

app.use("/public", express.static("public")); // assets

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
