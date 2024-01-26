console.log("Connected...");

// Element Imports
const thumbContainer = document.getElementById("thumb-container");
const galleryContainer = document.getElementById("gallery-container");
const mainImageContainer = document.getElementById("main-image-container");
const resultsContainer = document.getElementById("results-container");
const form = document.getElementById("form");
const body = document.querySelector("body");
const navLeft = document.getElementById("nav-left");
const navRight = document.getElementById("nav-right");

// Variable declarations
let images = [];
let currentPage = 1;
let currentQuery = "";

// // Test Object
// let customArrayOfObjs = [
//   {
//     url: "./images/cats-00.jpg",
//     alt: "Cat images number zero",
//   },
//   {
//     url: `./images/cats-01.jpg`,
//     alt: `Cat images number one`,
//   },
//   {
//     url: `./images/cats-02.jpg`,
//     alt: `Cat images number two`,
//   },
//   {
//     url: `./images/cats-03.jpg`,
//     alt: `Cat images number three`,
//   },
//   {
//     url: `./images/cats-04.jpg`,
//     alt: `Cat images number four`,
//   },
//   {
//     url: `./images/cats-05.jpg`,
//     alt: `Cat images number five`,
//   },
//   {
//     url: `./images/cats-06.jpg`,
//     alt: `Cat images number six`,
//   },
//   {
//     url: `./images/cats-07.jpg`,
//     alt: `Cat images number seven`,
//   },
//   {
//     url: `./images/cats-03.jpg`,
//     alt: `Cat images number seven`,
//   },
//   {
//     url: `./images/cats-02.jpg`,
//     alt: `Cat images number seven`,
//   },
// ];

// Form event listener, getting input and passing to handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let query = input.value;
  console.log(query);
  search(query, currentPage);
});

// Search/API Handler
async function search(queryParam, page) {
  currentQuery = queryParam;
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${queryParam}&client_id=${USER_KEY}`
  );
  const data = await response.json();
  console.log("Downloaded", data);
  createThumbnails(data.results);
}

// Populate the main image container
function populateBgImage(imgObj) {
  let bgImage = imgObj.urls.full;
  // let bgImage = imgObj.url
  body.setAttribute(`style`, `background-image: url(${bgImage})`);

  galleryContainer.setAttribute(`style`, `display: flex`);
}

// Generic function to make
function createDisplayImg(imgObj) {
  console.log("clicked");
  mainImageContainer.innerHTML = "";
  let img = document.createElement("img");
  img.src = imgObj.urls.thumb;
  img.alt = imgObj.alt_description;
  mainImageContainer.appendChild(img);
}

// Create thumbnails row after being passed an object
const createThumbnails = (arrayOfObjImages) => {
  // thumbContainer.innerHtml = "";
  // console.table(arrayOfImages);
  arrayOfObjImages.forEach((imgObj, index) => {
    let img = document.createElement("img");
    // img.src = imgObj.url;
    // img.alt = imgObj.alt;
    img.src = imgObj.urls.thumb;
    img.alt = imgObj.alt_description;
    img.classList.add("thumb-result");
    // img.style.width = `${100 / imgObj.length()}%`;
    img.addEventListener("click", () => {
      createDisplayImg(imgObj);
    });
    thumbContainer.appendChild(img);
    if (index === 0) {
      populateBgImage(imgObj);
      createDisplayImg(imgObj);
    }
  });
  // thumbContainer.appendChild(img);
};

if ((currentPage = 1)) {
  navLeft.setAttribute("style", "visibility: hidden");
}

// if ((currentPage = (data.total_pages -1)) {
//   navRight.setAttribute("style", "visibility: hidden");
// }

navLeft.addEventListener("click", () => {
  console.log("clicked");
  currentPage--;
  search();
});

navRight.addEventListener("click", () => {
  console.log("clicked");
  currentPage++;
  search(query, currentPage);
});

createThumbnails(images);
// function centerImage() {}

// To Do:
// Secondary images navigation
// Work out env variable
// Upgrade to an api object
// Keyboard interaction
// Add aria functionality
