//Card format

{
  /*
   <article>

  <a
class="course"
href="https://www.udemy.com/course/pythonforbeginners/"
><img
  src="https://img-c.udemycdn.com/course/240x135/394676_ce3d_5.jpg"
  alt="pyhon"
/>
<h3>Learn Python: Complete Python Programming Course</h3>
<h4 class="grey">Avinash Jain, The Codex</h4>
<div>
  <span class="checked">4.4</span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star-half-full checked"></span>
  <!-- <span class="fa fa-star-o checked "></span> -->
  <span class="grey">(2,876)</span>
</div>
<h5>E£679.99</h5>
</a> 
 </article>*/
}

{
  /* <a>
  <img></img>
  <h3></h3>
  <h44></h44>
  <div>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
  <h5></h5>
</a>; */
}

//Handle courses cards appearing
let jsonFile;
fetch("https://mocki.io/v1/51f4a61d-254a-4428-b015-96235a460ac1")
  .then((response) => response.json())
  .then((json) => {
    jsonFile = json;
    co = document.querySelector("#courses");

    for (let x of json) {
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

      newanchor.setAttribute("href", x.link);
      imgg.setAttribute("src", x.image);
      imgg.setAttribute("alt", "pyhton");
      h33.innerHTML = x.title;
      h44.innerHTML = x.author;
      rate.innerHTML = x.rating;
      fullStar.innerHTML = "";

      const list0 = newarticle.classList;
      list0.add(`courseNumber${x.id}`);

      const list1 = newanchor.classList;
      list1.add("course");

      const list2 = h44.classList;
      list2.add("grey");

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

      h55.innerHTML = "E£" + x.price;
      people.innerHTML = `(${x.people})`;
      co.appendChild(newarticle);
      newarticle.appendChild(newanchor);
      newanchor.appendChild(imgg);
      newanchor.appendChild(h33);
      newanchor.appendChild(h44);
      newanchor.appendChild(divv);
      divv.appendChild(rate);
      whole = Math.trunc(x.rating);
      for (let i = 0; i < whole; i++) {
        divv.appendChild(fullStar.cloneNode());
      }

      remainder = x.rating - whole;
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
  });


let addCards = (str) => {
  for (let x of jsonFile) {
    let card = document.querySelector(`.courseNumber${x.id}`);
    card.setAttribute("style", "display:flex;");
  }
  for (let x of jsonFile) {
    if (!x.title.toLowerCase().startsWith(str.toLowerCase())) {
      let card = document.querySelector(`.courseNumber${x.id}`);
      card.setAttribute("style", "display:none;");
    }
  }
};
