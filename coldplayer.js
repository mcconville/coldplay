var lineReader = require('line-reader');
var fs = require('fs');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var config = require('./config/credentials.json');

var pi = config.personalityInsights;

var personality_insights = new PersonalityInsightsV3({"username": pi.username, "password": pi.password, version_date: '2016-10-19'});

var fs = require('fs');

var albums=[
    'parachutes',
    'arushofbloodtothehead',
    'xandy',
    'vivalavida',
    'myloxyloto',
    'ghoststories',
    'headfullofdreams'
]

var results = [];

albums.forEach( function(album){

  fs.readFile('lyrics/' + album + '.txt', 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data);

      personality_insights.profile({
        text: data,
        consumption_preferences: true
      }, function(err, response) {
        if (err) {
          console.log('error:', err);
        } else {

          console.log(album);
          console.log( response)
          response.album = album;
          results.push(response);

          fs.writeFile('coldplay.json', JSON.stringify(results), function(err) {
            if (err) {
              return console.log(err);
            }
          })
        }
      });
  });
});
