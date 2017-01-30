#! /usr/bin/env node
var argv = require(`minimist`)(process.argv.slice(2));
var Habitat = require(`habitat`);
var pontoonToJson = require(`./src/pontoon-to-json`);

Habitat.load();

var config = {
  dest: argv.dest || `dist`,
  src: argv.src || `locales`,
  locales: argv.locales || process.env.SUPPORTED_LOCALES || `*`
};

pontoonToJson(config);
