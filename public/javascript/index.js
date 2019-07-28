var albums;
var insights = [];

var chris = document.getElementById('chris');

function changeSelect(reference) {
  var selector = document.getElementById('select' + reference);
  var percentile = selector[selector.selectedIndex].value;
  setBarCharts(reference, percentile);
}

function dataReader() {
  console.log(this.responseText);

  var coldplaydata = JSON.parse(this.responseText);

  albums = coldplaydata.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

  var albumpicker = document.getElementById('albumpicker');

  var timelinepanel = document.getElementById('timeline');

  albums.forEach(function(record) {
    var option = document.createElement('option');
    option.value = record.key;
    option.innerHTML = record.title;
    albumpicker.appendChild(option);
    console.log(record.title);

    var milestone = document.createElement('li');
    milestone.className = "milestone";
    milestone.innerHTML = '<div class="milestonedot"></div>' +
      '<label class="milestoneyear">' + record.year + '</label>' +
      '<label class="milestonealbum">' + record.title + '</label>';

    timelinepanel.append(milestone);
  })

  albumpicker.onchange = function(event) {
    console.log(event.target.value);
    console.log(insights[event.target.value]);
    chris.style.opacity = 0;
    initializeTraitPickers(event.target.value);
  }

  initializeTraitPickers(albumpicker.value);
}

function setBarCharts(selectcount, percentile) {
  var datalabel = document.getElementById('data' + selectcount);
  datalabel.innerHTML = percentile + '%';
  var whitespace = document.getElementById('whitespace' + selectcount);
  var gap = 100 - percentile;
  whitespace.style.height = gap + '%';
  var filled = document.getElementById('filled' + selectcount);
  filled.style.height = percentile + '%';
}

function addOption(trait, selectcount, traitselect) {
  var percentile = Math.round(trait.percentile * 100);
  var newoption = document.createElement('option');
  newoption.innerHTML = trait.name;
  newoption.type = 'parent';
  newoption.value = percentile;
  traitselect.appendChild(newoption);
  setBarCharts(selectcount, percentile);
}

function initializeTraitPickers(personalityid) {
  var personality = insights[personalityid].personality;

  var selectid = 'select';
  var selectcount = 0;

  personality.forEach(function(trait) {
    var traitselect = document.getElementById(selectid + selectcount);
    traitselect.innerHTML = "";
    addOption(trait, selectcount, traitselect);

    trait.children.forEach(function(childtrait) {
      addOption(childtrait, selectcount, traitselect);
    })

    selectcount++;
  })

  var src = "./images/svg/" + personalityid + ".svg"
  chris.src = src;
  chris.style.opacity = 1;
}

function insightsReader() {
  console.log(this.responseText);
  var insightsdata = JSON.parse(this.responseText);

  insightsdata.forEach(function(insight) {
    insights[insight.album] = insight;
  })

  /* read the Coldplay timeline data */

  var dataRequest = new XMLHttpRequest();
  dataRequest.addEventListener("load", dataReader);
  dataRequest.open("GET", "./data/timeline.json");
  dataRequest.send();
}

/* Read the personality insights data */

var dataRequest = new XMLHttpRequest();
dataRequest.addEventListener("load", insightsReader);
dataRequest.open("GET", "./data/coldplay.json");
dataRequest.send();
