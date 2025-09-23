const tailwindcss = require("tailwindcss");
const postcss = require("postcss");
const fs = require("fs");

const input = fs.readFileSync("./src/input.css", "utf-8");

postcss([tailwindcss({ config: "./tailwind.config.js" })])
  .process(input, { from: "./src/input.css", to: "./public/tailwind.css" })
  .then((result) => {
    fs.writeFileSync("./public/tailwind.css", result.css);
    console.log("Tailwind CSS built successfully!");
  });
