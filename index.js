//the Url of json file of track json file
let url;
//holding current track name
let currTrack = "Python";
//holding prev track name
let prevTrack;
//make each track  name to its json file
let tracksJsonMapping = {};
//last searched string to help changing of taps
//if the user seach about str in tap and turn to
//another tap find it searched
searchPrev = "";

////////////////////////////////////////////////////////////////
//////////////////////Fucntions/////////////////////////////////
////////////////////////////////////////////////////////////////

//when the used clicked on any track name it causes calling the
//function fill with passing track name as arguement
function fill(x) {
  prevTrack = currTrack;
  hidePrevCards(prevTrack);
  getUrl(x);
  if (availableJson(x)) {
    fillTrackArea(tracksJsonMapping[x]);
    currTrack = x;
  } else {
    fetchJson(x, url);
  }
}
//hidng cards of current track when used clicked on another
function hidePrevCards(prevTrack) {
  if (availableJson(prevTrack)) {
    json = tracksJsonMapping[prevTrack];

    for (let i = 0; i < json["courses"].length; i++) {
      let card = document.querySelector(
        `.courseNumber${json["courses"][i].id}`
      );
      card.classList.add("d-none");
    }
  }
}

function getUrl(x) {
  if (x == "Python") {
    url = "https://mocki.io/v1/db979b06-7226-474f-b159-f379f896a52c";
  } else if (x == "Excel") {
    url = "https://mocki.io/v1/869f5150-efb8-488e-b9b8-556aaabf9582";
  } else if (x == "Web") {
    url = "https://mocki.io/v1/af89039d-3c33-4a26-830a-57db4c7a25d8";
  } else if (x == "Java") {
    url = "https://mocki.io/v1/b0a01b14-d231-4b7e-b4bf-c6de9b3b0af5";
  } else if (x == "Data") {
    url = "https://mocki.io/v1/21c0da50-e4bf-4de8-9950-d069a598e560";
  } else if (x == "AWS") {
    url = "https://mocki.io/v1/55d2a528-e7cd-40b4-b5cf-ed78eaafe8ed";
  } else if (x == "Drawing") {
    url = "https://mocki.io/v1/a0613f7c-fe3a-4b3f-bbe0-d5f8358ff556";
  }
}
//if the json of the track user ordered is fetched before or not
function availableJson(x) {
  if (tracksJsonMapping[x] == undefined) {
    return false;
  } else {
    return true;
  }
}
//api call to fetch json file and save it in the map
function fetchJson(x, url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      tracksJsonMapping[x] = json;
      createCards(tracksJsonMapping[x]);
      fillTrackArea(tracksJsonMapping[x]);
      currTrack = x;
    });
}

//create all cards of track and make them not displayed
function createCards(json) {
  for (let x in json["courses"]) {
    if (x < 4) {
      co = document.querySelector("#courses0");
    } else if (x < 8) {
      co = document.querySelector("#courses1");
    } else {
      co = document.querySelector("#courses2");
    }
    //create elments
    const newarticle = document.createElement("article");
    const newanchor = document.createElement("a");
    const imgg = document.createElement("img");
    const h33 = document.createElement("h3");
    const h44 = document.createElement("h4");
    const divv = document.createElement("div");
    const h55 = document.createElement("h5");
    const rate = document.createElement("span");
    const fullStar = document.createElement("span");
    const halfStar = document.createElement("span");
    const noStar = document.createElement("span");
    const people = document.createElement("span");

    //set attuributes
    newanchor.setAttribute("href", "#");
    imgg.setAttribute("src", json["courses"][x].image);
    imgg.setAttribute("alt", "pyhton");
    // imgg.setAttribute("width", "pyhton");

    //set values
    h33.innerHTML = json["courses"][x]["title"];
    rate.innerHTML = json["courses"][x]["rating"].toFixed(2);
    h55.innerHTML = "E£" + json["courses"][x].price;
    people.innerHTML = `(${json["courses"][x].people})`;
    fullStar.innerHTML = "";
    //authors may be more than one
    let authors = json["courses"][x]["instructors"].map((y) => {
      return y["name"];
    });
    h44.innerHTML = authors.toString();

    //set styles
    const list0 = newarticle.classList;
    // console.log(json["courses"][x].id);
    list0.add(`courseNumber${json["courses"][x].id}`);
    list0.add("d-none");

    const list1 = newanchor.classList;
    list1.add("course");

    const list2 = h44.classList;
    list2.add("grey");
    list2.add("h6");

    const list3 = rate.classList;
    list3.add("checked");

    const list4 = fullStar.classList;
    list4.add("fa", "fa-star", "checked");

    const list5 = halfStar.classList;
    list5.add("fa", "fa-star-half-full", "checked");

    const list6 = noStar.classList;
    list6.add("fa", "fa-star-o", "checked");

    const list7 = people.classList;
    list7.add("grey");

    const list8 = h33.classList;
    list8.add("h6");

    //appeand the articale(card) to the existied class in th page
    co.appendChild(newarticle);
    //build the hierchy on the level of the card
    newarticle.appendChild(newanchor);
    newanchor.appendChild(imgg);
    newanchor.appendChild(h33);
    newanchor.appendChild(h44);
    newanchor.appendChild(divv);
    divv.appendChild(rate);

    //
    whole = Math.trunc(json["courses"][x].rating);
    for (let i = 0; i < whole; i++) {
      divv.appendChild(fullStar.cloneNode());
    }

    remainder = json["courses"][x].rating - whole;
    if (remainder >= 0.3 && remainder < 0.8) {
      divv.appendChild(halfStar);
      whole++;
    } else if (remainder >= 0.8) {
      divv.appendChild(fullStar);
      whole++;
    }
    for (let j = whole; j < 5; j++) {
      divv.appendChild(noStar.cloneNode());
    }
    divv.appendChild(people);
    newanchor.appendChild(h55);
  }
  fillTrackArea(json);
}
//providing head and paragraph of track and show cards
function fillTrackArea(json) {
  const head = document.querySelector(".trackheader");
  head.innerHTML = json["header"];
  const par = document.querySelector(".trackparagraph");
  par.innerHTML = json["description"];
  co = document.querySelector("#courses1");
  for (let i = 0; i < json["courses"].length; i++) {
    let card = document.querySelector(`.courseNumber${json["courses"][i].id}`);
    card.classList.remove("d-none");
  }
}
//search bar
let addCards = (str) => {
  searchAndUpdate(tracksJsonMapping[currTrack], str);
};
//show all cards in slide before search then search in slide
//about cards which don't start with the string the used wrote
//and hidden them
function searchAndUpdate(json, str) {
  for (let x in json["courses"]) {
    let card = document.querySelector(`.courseNumber${json["courses"][x].id}`);
    card.classList.remove("d-none");
  }
  for (let x in json["courses"]) {
    if (
      !json["courses"][x]["title"].toLowerCase().startsWith(str.toLowerCase())
    ) {
      let card = document.querySelector(
        `.courseNumber${json["courses"][x].id}`
      );
      card.classList.add("d-none");
    }
  }
}

fill("Python");
