/*
 * @file: index.js
 * @description: includes all configurations in a single file
 * @date: Jan 23, 2018
 * @author: Banti Ram
 */

"use strict";

module.exports = {
  cloudinary: require("./cloudinaryConfigs"),
  CONST: require("./constants"),
  db: require("./dbConfigs")
};