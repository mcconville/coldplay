var lineReader = require('line-reader');
var fs = require('fs');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var config = require('./config/credentials.json');

var pi = config.personalityInsights;

var personality_insights = new PersonalityInsightsV3({"username": pi.username, "password": pi.password, version_date: '2016-10-19'});


var index=0;

var characters = [
  'ELIZA',
  'BURR',
  'LAURENS',
  'JEFFERSON',
  'MADISON',
  'HAMILTON',
  // 'COMPANY',
  'WASHINGTON',
  // 'WOMEN',
  // 'MEN',
  'MULLIGAN',
  'LAFAYETTE',
  'PHILIP',
  'PEGGY',
  'SCHUYLER SISTERS',
  'SEABURY',
  // 'FEMALE',
  'KING GEORGE',
  'ENSEMBLE',
  'ANGELICA',
  'LEE',
  'EAKER',
  'MARIA',
  'JAMES',
  'DOCTOR'
]

var lines = [];

var combinedData = [];

var CHANGE = false;
var CURRENTCHARACTER = 'BURR';

function checkCharacter(line) {

  var CHANGE = false;

  for (var c = 0; c < characters.length; c++) {
    if (line.includes(characters[c])) {
      CURRENTCHARACTER = characters[c];
      CHANGE = true;

      if (lines[CURRENTCHARACTER] === undefined) {
        lines[CURRENTCHARACTER] = '';
      }

      break;
    }
  }

  return {change: CHANGE, character: CURRENTCHARACTER};
}

function personality(callback){

  var filename = characters[index] + '.txt';
  var text = lines[characters[index]];

  personality_insights.profile({
    text: text,
    consumption_preferences: true
  }, function(err, response) {
    if (err) {
      //            console.log('error:', err);
    } else {

      console.log(filename);

      response.character = characters[index];

      combinedData.push(response);

      index = index + 1;

      if( index < characters.length ){
        fs.writeFile('hamilton.json', JSON.stringify(combinedData), function(err) {
          if (err) {
            return console.log(err);
          }
        })
         personality();
      }
    }
  });
}

function counter(){
  index = index + 1;

  if( index < characters.length ){
     personality();
  }
}

lineReader.eachLine('show.txt', function(line, last) {
  // console.log(line);
  // do whatever you want with line..

  var cue = checkCharacter(line);

  if (cue.change === false) {
    lines[CURRENTCHARACTER] = lines[CURRENTCHARACTER] + ' ' + line;
  }

  if (last) {
    // or check if it's the last one

    // console.log(lines['HAMILTON']);

    index = 0;

    personality()
  }
});
