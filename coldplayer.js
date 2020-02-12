/**
 * Copyright 2015-2020 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var lineReader = require('line-reader');
var fs = require('fs');
var config = require('./config/credentials.json');
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');
const {
  IamAuthenticator
} = require('ibm-watson/auth');

const personality_insights = new PersonalityInsightsV3({
  version: '2019-10-13',
  authenticator: new IamAuthenticator({
    apikey: config.personalityInsights.key,
  }),
  url: config.personalityInsights.url,
});

var pi = config.personalityInsights;

var albums = [
  'parachutes',
  'arushofbloodtothehead',
  'xandy',
  'vivalavida',
  'myloxyloto',
  'ghoststories',
  'headfullofdreams'
]

var results = [];

albums.forEach(function (album) {

  fs.readFile('lyrics/' + album + '.txt', 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);

    const profileParams = {
      // Get the content from the JSON file.
      content: data,
      contentType: 'text/plain',
      consumptionPreferences: true,
      rawScores: true,
    };

    personality_insights.profile(profileParams)
      .then(response => {

        // console.log(JSON.stringify(profile, null, 2));
        console.log(album);
        console.log(response)
        response.album = album;
        results.push(response);

        fs.writeFile('coldplay.json', JSON.stringify(results), function (err) {
          if (err) {
            return console.log(err);
          }
        })
      })
      .catch(err => {
        console.log('error:', err);
      });
  });
});