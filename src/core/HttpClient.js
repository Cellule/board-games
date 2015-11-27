/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import request from 'superagent';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { parseString as xmlParse } from 'xml2js';

function getUrl(path) {
  if (path.startsWith('http') || canUseDOM) {
    return path;
  }

  return process.env.WEBSITE_HOSTNAME ?
    `http://${process.env.WEBSITE_HOSTNAME}${path}` :
    `http://127.0.0.1:${global.server.get('port')}${path}`;
}

const HttpClient = {

  get: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          resolve(res.body);
        }
      });
  }),
  getXml: path => new Promise((resolve, reject) => {
    request
      .get(getUrl(path))
      .accept('text/xml')
      .accept('application/xml')
      .accept('text/html')
      .accept('application/xhtml+xml')
      .end((err, res) => {
        console.log(getUrl(path))
        if (err) {
          if (err.status === 404) {
            resolve(null);
          } else {
            reject(err);
          }
        } else {
          xmlParse(res.text, (xmlErr, xmlRes) => {
            if (xmlErr) {
              return reject(xmlErr);
            }
            resolve(xmlRes);
          });
        }
      });
  }),
};

export default HttpClient;
