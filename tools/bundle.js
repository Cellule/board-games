/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import config from './config';
import uniq from 'lodash.uniq';
import pkg from '../package.json';
import merge from 'lodash.merge';
import coreList from 'node-core-module-names';
import colors from 'colors/safe';

/**
 * Bundles JavaScript, CSS and images into one or more packages
 * ready to be used in a browser.
 */
export default async () => new Promise((resolve, reject) => {
  console.log('bundle');
  const bundler = webpack(config);
  let bundlerRunCount = 0;

  global.__externals = [
    'source-map-support' // added by webpack
  ];
  const dependencies = merge({}, pkg.dependencies);
  function bundle(err, stats) {
    if (err) {
      return reject(err);
    }

    console.log(stats.toString(config[0].stats));

    if (++bundlerRunCount === (global.WATCH ? config.length : 1)) {
      for(var ext of uniq(global.__externals)) {
        dependencies[ext] = !!dependencies[ext];
      }
      for(var ext in dependencies) {
        if(dependencies.hasOwnProperty(ext)) {
          if(dependencies[ext] === false) {
            if(coreList.indexOf(ext) === -1) {
              console.log(colors.red(`Missing required dependency ${ext} in package.json`));
            }
          } else if(dependencies[ext] !== true) {
            console.log(colors.yellow(`Extra dependency ${ext} in package.json`));
          }
        }
      }
      return resolve();
    }
  }

  if (global.WATCH) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});
