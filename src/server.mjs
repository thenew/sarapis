/**
 * Create a HTTP server with Node.js
 */

import http from "http";
import fs from "fs";
import serveStatic from "serve-static";
import ejs from "ejs";
import ua from "universal-analytics";
import { domain, dataPath } from "./helpers/config.mjs";

import Home from "./components/Home.mjs";
import Single from "./components/Single.mjs";

const visitor = ua("UA-164644-X");

const tracking = (url) => {
  visitor.pageview(domain + url).send();
};

// Handle client request and send server response
const requestListener = (request, response) => {
  const url = request.url;

  /**
   * Controller renders the view
   * @param  {string} view Template filename
   * @param  {} component
   */
  const render = (view, component = null, code = 200) => {
    tracking(url);
    ejs.renderFile(`./views/${view}.ejs`, { data: component, domain: domain }, {}, (error, str) => {
      if (error) console.log(error);
      response.writeHead(code, { "Content-Type": "text/html" });
      response.end(str);
    });
  };

  // Serve up static files
  const serve = serveStatic(".");

  serve(request, response, () => {
    const flagsCountries = JSON.parse(fs.readFileSync(`${dataPath}/sarapis.json`))
    const flagsMaritime = JSON.parse(fs.readFileSync(`${dataPath}/flags-maritime.json`))

    const flags = {...flagsCountries, ...flagsMaritime}

    let keyMatch = false;

    /**
     * Routes
     */

    // home
    if (url === "/") {
      render("home", Home({request, items: flags}));
    }

    // single
    else if ((keyMatch = Object.keys(flags).find((slug) => `/${slug}` == url))) {
      render("single", Single({request, item: flags[keyMatch]}));
    }

    // 404
    else {
      render("404", null, 404);
    }
  });
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT || 4200, (error) => {
  if (error) console.log(error);
  console.log(`Server running on PORT ${server.address().port}`);
});
