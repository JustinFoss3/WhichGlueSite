// index.js

/**
 * Required External Modules
 */

 const express = require("express");
 const path = require("path");
 var bodyParser = require('body-parser');
 var materials = require('./materials.json');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */

 app.engine('pug', require('pug').__express);
 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "pug");
 app.use(express.static(path.join(__dirname, "public")));
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

/**
 * Routes Definitions
 */

 app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/", (req, res) => {
      var mat1, mat2, results;
      if (req.body.material1 && req.body.material2) {
          mat1 = req.body.material1;
          mat2 = req.body.material2;
          results = materials[mat1][mat2];
      }
    res.render("index", { glues: results,
                            mat1: mat1,
                            mat2: mat2 });
  });
  
/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });