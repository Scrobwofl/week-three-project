console.log("Connected...");

// Element Imports
const thumbContainer = document.getElementById("thumb-container");
const galleryContainer = document.getElementById("gallery-container");
const mainImageContainer = document.getElementById("main-image-container");
const resultsContainer = document.getElementById("results-container");
const altTextContainer = document.getElementById("alt-text-container");
const form = document.getElementById("form");
const body = document.querySelector("body");
const navLeft = document.getElementById("nav-left");
const navRight = document.getElementById("nav-right");
let input = document.getElementById("search-input");

const defaultImageObj = {
  urls: { full: "./images/default-cat-large.jpg" },
  alt_description:
    "The default background image of a tabby cat that is looking at you with a puzzled face.",
};

// Variable declarations
let images = [];
let currentPage = 1;
let totalPages;

const defaultQuery = "Cats";
let currentQuery = getLastSearch();

function setDefaultImage() {
  populateMainImage(defaultImageObj);
  populateBgImage(defaultImageObj);
}

// Save current query to storage
function saveLastSearch(query) {
  localStorage.setItem("lastSearch", query);
}

// Get last query from storage
function getLastSearch() {
  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch !== null) {
    return lastSearch;
  } else {
    return defaultQuery;
  }
}

// Navigation event listeners
navLeft.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    search(currentQuery, currentPage);
  }
  updateNavigationVisibility();
});
navRight.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    search(currentQuery, currentPage);
  }
  updateNavigationVisibility();
});

// Form event listener, getting input and passing to handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let query = input.value;
  search(query, currentPage);
});

// Search/API Handler
async function search(queryParam, page) {
  try {
    // const USER_KEY = process.env.USER_KEY;
    const USER_KEY = `VWoLqlmrvvZz1HTP766zAahlDAwstAZL4AYoePYkcg4`;

    currentQuery = queryParam;
    // currentPage = page;
    let response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${queryParam}&client_id=${USER_KEY}`
    );
    const data = await response.json();
    totalPages = data.total_pages;
    console.log("Downloaded", data);
    createThumbnails(data.results);
    saveLastSearch(queryParam);
  } catch (error) {
    console.log(`${error}`);
    alert(
      `You have received an error, please refresh the page. The error is: ${error}`
    );
  }
}

// Add the thumbnails in the bar at the bottom
const createThumbnails = (arrayOfObjImages) => {
  if ((resultsContainer.style.display = "none")) {
    resultsContainer.style.display = "flex";
  }
  //cleaen out the existing content
  thumbContainer.innerHTML = ``;

  // loop through the object and do your business
  arrayOfObjImages.forEach((imgObj, index) => {
    let img = document.createElement("img");
    img.src = imgObj.urls.thumb;
    img.alt = imgObj.alt_description;
    img.classList.add("thumb-result");
    // img.setAttribute("style", `width: ${imgObj.length}`);
    // img.style.width = `${100 / imgObj.length()}%`;

    // The event listener that updates the current image
    img.addEventListener("click", () => {
      populateMainImage(imgObj);
      populateBgImage(imgObj);
    });
    thumbContainer.appendChild(img);
    if (index === 0) {
      populateBgImage(imgObj);
      populateMainImage(imgObj);
    }
  });
};

// Populate the main image container
function populateBgImage(imgObj) {
  const bgContainer = document.getElementById("bg-container");
  let bgImage = imgObj.urls.thumb;
  bgContainer.setAttribute(`style`, `background-image: url(${bgImage})`);
  galleryContainer.setAttribute(`style`, `display: flex`);
}

// Generic function to make image containers
function populateMainImage(imgObj) {
  // Update the main image
  mainImageContainer.innerHTML = "";
  let img = document.createElement("img");
  img.src = imgObj.urls.full;
  img.alt = imgObj.alt_description;
  mainImageContainer.appendChild(img);

  //update the alt description being displayed
  console.log(imgObj.alt_description);
  altTextContainer.innerHTML = `<p>${imgObj.alt_description}</p>`;
}

// This bit i got chatgpts help with as I was getting completely lost. I had the event listener part, but separating out the concern of the navigation visibility didn't occur to me, I was trying to do it all in the event listener and was getting loops due to recalling the search function.
// function updateNavigationVisibility() {
//   navLeft.style.visibility = currentPage <= 1 ? "hidden" : "visible";
//   navRight.style.visibility = currentPage >= totalPages ? "hidden" : "visible";
// }

// Rewrote the above part in a syntax i can read more easily. Haven't really got ternery operators memorised yet.
function updateNavigationVisibility() {
  if (currentPage < 1) {
    navLeft.style.visibility = "hidden";
  } else {
    navLeft.style.visibility = "visible";
  }

  if (currentPage > totalPages) {
    navRight.style.visibility = "hidden";
  } else {
    navRight.style.visibility = "visible";
  }
}

setDefaultImage();
search(currentQuery, currentPage);
