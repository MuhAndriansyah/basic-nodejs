const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require('./modules/replaceTemplate.js');

//Load Template
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  `utf-8`
);
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  `utf-8`
);
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  `utf-8`
);

//Json
const data = fs.readFileSync(
  `${__dirname}/starter/dev-data/data.json`,
  `utf-8`
);
const dataObj = JSON.parse(data);
// console.log(dataObj)
const server = http.createServer((req, res) => {
  // console.log(req.url);

  //Url
  const { query, pathname } = url.parse(req.url, true);

  //Overview
  if (pathname === "/" || pathname === "/overview") {
    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardHtml);
    // console.log(cardHtml);
    res.end(output);

    //Product
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //Api
  } else if (pathname === `/api`) {
    res.writeHead(200, {
      "Content-type": "application/api"
    });
    res.end(data);

    //PageNotFound
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Muh.Andriansyah"
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listen requests on port 8000`);
});
