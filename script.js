window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

var nav = document.getElementById("hor-menu-id");
var items = nav.getElementsByClassName("hor-menu-item");
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}




var nav = document.getElementById("portfolio");
var items = nav.getElementsByClassName("portfolio-item");
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("portfolio-active");
    current[0].className = current[0].className.replace(" portfolio-active", "");
    this.className += " portfolio-active";
  });
}

var nav = document.getElementById("portfolio-grid");
var items = nav.getElementsByClassName("grid-item");
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("grid-item-active");
    current[0].className = current[0].className.replace(" grid-item-active", "");
    this.className += " grid-item-active";
  });
}


/* MODAL WINDOW */

const button = document.querySelector("form button");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal__background");
const modalMessage = document.querySelector(".modal__message");

//Add Close button to modal window
function addCloseButton(node){
  node.innerHTML += "<button class='modal__close-button' type='button'>OK</button>";
  const modalCloseButton = document.querySelector(".modal__close-button");
  modalCloseButton.addEventListener("click", hideModal);
  return node;
}

//Get value from form field
function addNodeValue (node, fieldName, defaultValue = "Не заполнено", br) {
  let value = document.querySelector(node).value;
  value = (value == "") ? defaultValue : value;
  return `<p>${fieldName}: ${value}</p>`;
}

//Show modal window
function showModal () {
  modal.classList.remove("hidden");
}

//Hide modal window
function hideModal () {
  modal.classList.add("hidden");
  document.forms[0].reset();
}

//Create content of modal window
button.addEventListener("click", (event) => {
  let requiredFields = [...document.querySelectorAll("[required]")];
  let isValid = node => node.checkValidity();

  //Check if all required fields filled with valid data
  if ( requiredFields.every(isValid) ) {
    event.preventDefault();
    let message = "<p>The letter was sent</p>";

    message += addNodeValue("input[name='subject']",
                            "Subject",
                            "No subject");

    message += addNodeValue("textarea[name='message']",
                            "Description",
                            "No description");
    modalMessage.innerHTML = message;
    addCloseButton(modalMessage);
    showModal();
  }
});

// Add close action to modal window background
modalBackground.addEventListener("click", hideModal);

/* SLIDER */

const sliderBackground = document.querySelector(".slider");
const slideContainer = document.querySelector(".slider__images");
const arrow = document.querySelectorAll(".slider .arrow");

const slides = {
  0: [`<div class="iphone iphone_vertical">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>`,
      `<div class="iphone iphone_horizontal">
        <div class="iphone__screen iphone__clickable"></div>
        <div class="iphone__phone iphone__clickable"></div>
        <div class="iphone__shadow"></div>
       </div>`],
  1: [`<img width="517" height="513" src="./assets/slider-images/2-iphones.png" alt="iPhone Vertical">`]
};

const slideColor = {
  0: "bg-red",
  1: "bg-blue",
  "default": "bg-red"
}

// Phone screens switching off / on
function phoneScreensActivate() {
  const phones = document.querySelectorAll(".slider .iphone");
  phones.forEach( phone => phone.querySelectorAll(".iphone__clickable").forEach( 
    element => element.addEventListener( "click", event => {
      let screen = phone.querySelector(".iphone__screen");
      (screen.classList.contains("hidden")) ?
        screen.classList.remove("hidden") :
        screen.classList.add("hidden");
    })
  ));
}
phoneScreensActivate();

let currentSlide = 0;
arrow.forEach( each => each.addEventListener("click", event => {
  ( event.target.classList.contains("left") ) ? currentSlide-- : currentSlide++;

  if (currentSlide == Object.keys(slides).length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = Object.keys(slides).length-1;
  }

  sliderBackground.classList.value = "slider home";

  if(slideColor.hasOwnProperty(currentSlide)) {
    sliderBackground.classList.add(slideColor[currentSlide]);
  } else {
    sliderBackground.classList.add( slideColor["default"] );
  }
  slideContainer.innerHTML = "";
  slides[currentSlide].forEach( img => slideContainer.innerHTML += `\n${img}`);

  phoneScreensActivate();
}));


// Перемешивание портфолио
const FILTER_BUTTONS = document.querySelectorAll(".portfolio-item")

for (let filterButton of FILTER_BUTTONS) {
  filterButton.addEventListener("click", shufflePortfolio)
}

function shufflePortfolio(event) {
 
  if (event.target.classList.contains("portfolio-active")) return
  const portfolioPhotos = document.getElementById("portfolio-grid")

  let shuffledPortfolioPhotos = document.createElement("div")
  shuffledPortfolioPhotos.className = "grid-portfolio"
  shuffledPortfolioPhotos.id = "portfolio-grid"

  const portfolio = Array.from(portfolioPhotos.querySelectorAll(".grid-item"))

  for (let i = portfolio.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    const temp = portfolio[j]
    portfolio[j] = portfolio[i]
    portfolio[i] = temp
    window.alert("ddddddd");
  }
  for (let item of portfolio) {
    shuffledPortfolioPhotos.append(item)
  }

  portfolioPhotos.replaceWith(shuffledPortfolioPhotos)
}
//--------------------------------------------