import "./env.js";
import chalk from "chalk";
//const chalk = require("chalk"); // même chose que la ligne 1 du haut.

import app from "./src/app.js";

console.log(chalk.blue('Hello world!'));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(chalk.red(`Server listening on port: ${PORT}`));
});