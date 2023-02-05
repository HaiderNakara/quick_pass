#!/usr/bin/env node
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { exec } from "child_process";
import { promisify } from "util";
// import clipboard from "clipboardy";
// var ncp = require("copy-paste");
import ncp from "copy-paste";
const exec_run = promisify(exec);

function generatePin(length = 4) {
  const pin = Math.floor(Math.random() * 10 ** length);
  return showPassword(pin.toString());
}
function textAndNumber(length = 10) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return showPassword(retVal);
}


async function main() {
  const args = process.argv.slice(2);
  let length = 10;
  if (args && args.length > 0) {
    if (args[0] === "pin") {
      if (args[1]) {
        try {
          const temp = parseInt(args[1]);
          if (temp) {
            if (temp < 4) {
              console.log(chalk.red("Minimum length of pin is 4"));
            } else {
              length = temp;
            }
          }
        } catch (error) {
          console.log(chalk.red("Invalid length of pin"));
        }
      }
      return generatePin(length);
    }
    if (args[0] === "text") {
      if (args[1]) {
        try {
          const temp = parseInt(args[1]);
          if (temp) {
            if (temp < 8) {
              console.log(chalk.red("Minimum length of text is 8"));
            } else {
              length = temp;
            }
          }
        } catch (error) {
          console.log(chalk.red("Invalid length of text"));
        }
      }
      return textAndNumber(length);
    }
    try {
      const temp = parseInt(args[0]);
      if (temp) {
        if (temp < 8) {
          console.log(chalk.red("Minimum length of password is 8"));
        } else if (temp > 30) {
          console.log(chalk.red("Maximum length of password is 30"));
        } else {
          length = temp;
        }
      }
      return createPasswd(length);
    }
    catch (error) {
      console.log(chalk.red("Invalid length of password"));
    }
  }
  return createPasswd(length);
}


function createPasswd(
  length: number = 10,
) {
  const specialChars = "!@#$%^&*()_+~|}{[]\:;'?><,./-=";
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + specialChars;
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return showPassword(retVal);
}
function showPassword(password: string) {
  const spinner = createSpinner("Copying password to clipboard");
  spinner.start();
  try {
    ncp.copy(password);
  } catch (error) {
    console.log(chalk.red("Error while copying password to clipboard"));
    console.log(chalk.red("Please manually copy the password"));
    console.log(chalk.red("Password generated: " + password));
  }
  spinner.stop();
  console.log(chalk.green("Your password is copied to clipboard Happy Hacking"));
  console.log(chalk.green("Password generated: " + password));
}
main();
