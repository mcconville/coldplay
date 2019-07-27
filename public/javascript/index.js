var albums;
var insights = [];

function dataReader() {
  console.log(this.responseText);

  var coldplaydata = JSON.parse(this.responseText);

  albums = coldplaydata.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

  var albumpicker = document.getElementById('albumpicker');

  albums.forEach(function(record) {
    var option = document.createElement('option');
    option.value = record.key;
    option.innerHTML = record.title;
    albumpicker.appendChild(option);
    console.log(record.title);
  })

  albumpicker.onchange = function(event) {
    console.log(event.target.value);
    console.log(insights[event.target.value]);

    var src = "./images/svg/" + event.target.value + ".svg"
    var chris = document.getElementById('chris');
    chris.src = src;
    initializeTraitPickers(event.target.value);
  }

  initializeTraitPickers(albumpicker.value);
}

function initializeTraitPickers(personalityid){
  var personality = insights[personalityid].personality;

  var selectid = 'select';
  var selectcount = 0;

  personality.forEach(function(trait){
    var traitselect = document.getElementById(selectid + selectcount);
    traitselect.innerHTML = "";

    var percentile = Math.round(trait.percentile * 100);

    // Math.round(parseInt(trait.percentile)*100)

    var newoption = document.createElement('option');
    newoption.innerHTML = trait.name;
    newoption.type = 'parent';
    newoption.value = percentile;
    // newoption.value = ;
    traitselect.appendChild(newoption);

    var datalabel = document.getElementById('data' + selectcount);
    datalabel.innerHTML = percentile + '%';





    selectcount++;
  })
}

function insightsReader() {
  console.log(this.responseText);
  var insightsdata = JSON.parse(this.responseText);

  insightsdata.forEach(function(insight) {
    insights[insight.album] = insight;
  })
}



var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", insightsReader);
dataRequest.open("GET", "./data/coldplay.json");
dataRequest.send();


var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", dataReader);
dataRequest.open("GET", "./data/timeline.json");
dataRequest.send();
