/*
 * @file: index.js
 * @description: exporting all configurations i.e, (cloudinary, constants and database configurations)
 * @date: 09 Feb, 2018
 * @author: Banti Ram
 */

"use strict";

module.exports = {
  cloudinary: require("./cloudinaryConfigs"),
  CONST: require("./constants"),
  db: require("./dbConfigs")
};