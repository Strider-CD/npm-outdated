var client = require('strider-ecosystem-client')
  , needle = require('needle')
  , _ = require('lodash')
  , Promise = require('bluebird')
  , chalk = require('chalk');

var registryURL = function(name, tag) {
  return 'http://registry.npmjs.org/'+name+'/'+tag
}

client.fetchPlugins().then(function(plugins) {
  return _.map(plugins, function(obj, name) {
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
          return reject(new Error(res.body.error))
        plugin.outdated = true;
      } else {
        plugin.outdated = false;
      }
      resolve(plugin)
    })
  });
}).map(function(plugin) {
  var label = plugin.name+'@'+plugin.version
  if (plugin.outdated)
    console.log(chalk.green('✓'), label, 'is on npm');
  else
    console.log(chalk.red('✘'), label, 'is NOT on npm');
})
