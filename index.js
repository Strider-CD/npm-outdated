'use strict';

var client = require('strider-ecosystem-client');
var needle = require('needle');
var map = require('lodash.map');
var Promise = require('bluebird');
var chalk = require('chalk');

var registryURL = function(name, tag) {
  return 'http://registry.npmjs.org/' + name + '/' + tag;
};

client.fetchPlugins().then(function(plugins) {
  return map(plugins, function(obj, name) {
    return {
      name: obj.module_name,
      version: obj.tag,
      registryURL: registryURL(obj.module_name, obj.tag)
    }
  })
}).map(function(plugin) {
  return new Promise(function(resolve, reject) {
    needle.get(plugin.registryURL, function(err, res) {
      if (err) return reject(err);
      if (res.body.error) {
        if (! /version not found/.test(res.body.error))
          return reject(new Error(res.body.error));
        needle.get(registryURL(plugin.name, 'latest'), function(err, res) {
          plugin.latestPublished = res.body.version;
          plugin.maintainers = res.body.maintainers;
          plugin.outdated = true;
          resolve(plugin)
        });
      } else {
        plugin.outdated = false;
        resolve(plugin);
      }
    })
  });
}).map(function(plugin) {
  var label = plugin.name + '@' + plugin.version;

  if (plugin.outdated) {
    console.log(chalk.red('✘'), label, 'is NOT on npm');
    console.log('\t', 'npm version:', plugin.latestPublished);
    console.log('\t', 'maintainers:');
    plugin.maintainers.forEach(function(m) {
      console.log('\t', chalk.yellow('=>'), m.name, '<' + m.email + '>');
    });
  } else {
    console.log(chalk.green('✓'), chalk.grey(label, 'is on npm'));
  }
}).error(function(err) {
  console.error(err.stack);
}).catch(function(err) {
  console.error(err.stack);
});
