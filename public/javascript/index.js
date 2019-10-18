var albums;
var insights = [];

var dots = [];

var chris = document.getElementById('chris');

function changeSelect(reference) {
  var selector = document.getElementById('select' + reference);
  var percentile = selector[selector.selectedIndex].value;
  setBarCharts(reference, percentile);
}

function clearDots(){
  dots.forEach( function(dot){
    var d = document.getElementById(dot);
    d.style.background = "#D8D8D8";
  })
}

function dataReader() {

  var coldplaydata = JSON.parse(this.responseText);

  albums = coldplaydata.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

  var albumpicker = document.getElementById('albumpicker');

  var timelinepanel = document.getElementById('timeline');

  albums.forEach(function(record) {
    var option = document.createElement('option');
    option.value = record.key;
    option.innerHTML = record.title;
    albumpicker.appendChild(option);

    var milestone = document.createElement('li');
    milestone.className = "milestone";
    milestone.innerHTML = '<div id="' + record.key + 'dot" ' + 'class="milestonedot"></div>' +
      '<label class="milestoneyear">' + record.year + '</label>' +
      '<label class="milestonealbum">' + record.title + '</label>';

      dots.push(record.key + 'dot');

    timelinepanel.append(milestone);
  })

  albumpicker.onchange = function(event) {

    // chris.style.opacity = 0;
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

  clearDots();

  var d = document.getElementById( personalityid + 'dot' );
  d.style.background ='#333';

  var src = "./images/svg/" + personalityid + ".svg"
  chris.src = src;
}

function insightsReader() {
  // console.log(this.responseText);
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


var myVar = setInterval(myTimer, 5000);

var automaticState = true;

var mySelect = document.getElementById('albumpicker');

var pointer = 0;

document.querySelector('.btn').addEventListener('click', function(e) {
  // from https://www.jamestease.co.uk/blether/add-remove-or-toggle-classes-using-vanilla-javascript
  // querySelectorAll returns a nodeList, so map to to an array and BOOM
  // if there's only one element to toggle, you can skip the array
  // and grab it with a simple querySelector
  console.log('toggled');
  if(automaticState == true){
    window.clearInterval(myVar);
    automaticState = false;
    var toggle = document.getElementById('togglebutton');
    toggle.innerHTML = 'switch to automatic';
  }else{
    myVar = setInterval(myTimer, 5000);
    automaticState = true;
    var toggle = document.getElementById('togglebutton');
    toggle.innerHTML = 'switch to exploration';
  }

  [].map.call(document.querySelectorAll('.click-target'), function(el) {
    // classList supports 'contains', 'add', 'remove', and 'toggle'
    el.classList.toggle('toggled');

    console.log('othertoggled');
  });
});

function myTimer() {

  if( pointer+1 < mySelect.length ){
      mySelect.selectedIndex = pointer+1;
      pointer++;
      initializeTraitPickers(mySelect.value);
  }else{
    mySelect.selectedIndex = 0;
  initializeTraitPickers(mySelect.value);
    pointer = 0;
  }
}
