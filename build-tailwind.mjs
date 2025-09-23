import tailwindcss from "tailwindcss";
import fs from "fs";
import postcss from "postcss";

const input = fs.readFileSync("./src/input.css", "utf-8");

const result = await postcss([
  tailwindcss({ config: "./tailwind.config.js" }),
]).process(input, { from: "./src/input.css", to: "./public/tailwind.css" });

fs.writeFileSync("./public/tailwind.css", result.css);
console.log("Tailwind CSS built successfully!");
