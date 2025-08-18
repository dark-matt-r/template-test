// DOM Elements.
let imageContainer = document.getElementById("image-container");
let loader = document.getElementById("loader");

// Global variables.
let imagesLoaded = 0; // Counter for the number of images loaded.
let totalImages = 0; // Total number of images to be loaded.
let ready = false;

// Unsplash API.
const count = 8; // Number of photos to fetch.
const apiKey = "d0uwtmioxxuBTbo9gP3DpS-DVAHYfoQ8Mf8HASwMRVQ"; // Unsplash API key.
// const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Array to hold the fetched photos.
let photosArray = [];

// Add new elements to the DOM for displaying a photo.
function displayPhotos() {
  imagesLoaded = 0; // Reset the counter for each new batch of photos.
  // Set the total number of images to the length of the photosArray.
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Creating a link.
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // Creating an image element.
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);
    image.addEventListener("load", () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
      }
    });
    // Put image inside the link element.
    item.appendChild(image);
    // Put the link element inside the imageContainer element.
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API.
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}

// Check if the user has scrolled to the bottom of the page.
// If so, fetch more photos.
window.document.addEventListener("scroll", () => {
  if (
    ready &&
    window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1000
  ) {
    ready = false; // Set ready to false to prevent multiple fetches.
    getPhotos();
  }
});

// On load
getPhotos();
