"use strict";

// Include the app.js file.
// This will run the code.
console.log("entrypoint");
const app = require("./app.js");
const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });