#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const nanospinner_1 = require("nanospinner");
const child_process_1 = require("child_process");
const util_1 = require("util");
// import clipboard from "clipboardy";
// var ncp = require("copy-paste");
const copy_paste_1 = __importDefault(require("copy-paste"));
const exec_run = (0, util_1.promisify)(child_process_1.exec);
function generatePin(length = 4) {
    const pin = Math.floor(Math.random() * Math.pow(10, length));
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv.slice(2);
        let length = 10;
        if (args && args.length > 0) {
            if (args[0] === "pin") {
                if (args[1]) {
                    try {
                        const temp = parseInt(args[1]);
                        if (temp) {
                            if (temp < 4) {
                                console.log(chalk_1.default.red("Minimum length of pin is 4"));
                            }
                            else {
                                length = temp;
                            }
                        }
                    }
                    catch (error) {
                        console.log(chalk_1.default.red("Invalid length of pin"));
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
                                console.log(chalk_1.default.red("Minimum length of text is 8"));
                            }
                            else {
                                length = temp;
                            }
                        }
                    }
                    catch (error) {
                        console.log(chalk_1.default.red("Invalid length of text"));
                    }
                }
                return textAndNumber(length);
            }
            try {
                const temp = parseInt(args[0]);
                if (temp) {
                    if (temp < 8) {
                        console.log(chalk_1.default.red("Minimum length of password is 8"));
                    }
                    else if (temp > 30) {
                        console.log(chalk_1.default.red("Maximum length of password is 30"));
                    }
                    else {
                        length = temp;
                    }
                }
                return createPasswd(length);
            }
            catch (error) {
                console.log(chalk_1.default.red("Invalid length of password"));
            }
        }
        return createPasswd(length);
    });
}
function createPasswd(length = 10) {
    const specialChars = "!@#$%^&*()_+~|}{[]\:;'?><,./-=";
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + specialChars;
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return showPassword(retVal);
}
function showPassword(password) {
    const spinner = (0, nanospinner_1.createSpinner)("Copying password to clipboard");
    spinner.start();
    try {
        copy_paste_1.default.copy(password);
    }
    catch (error) {
        console.log(chalk_1.default.red("Error while copying password to clipboard"));
        console.log(chalk_1.default.red("Please manually copy the password"));
        console.log(chalk_1.default.red("Password generated: " + password));
    }
    spinner.stop();
    console.log(chalk_1.default.green("Your password is copied to clipboard Happy Hacking"));
    console.log(chalk_1.default.green("Password generated: " + password));
}
main();
