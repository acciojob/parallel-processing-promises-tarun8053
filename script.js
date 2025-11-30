// Required DOM elements
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// Image list
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Download a single image (returns a Promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load: ${url}`);

    img.src = url;
  });
}

// Download all images in parallel
function downloadImages() {
  output.innerHTML = "";
  error.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  const promises = images.map((img) => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loading.style.display = "none";

      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      loading.style.display = "none";
      error.textContent = err;
    });
}

// Attach click event handler
btn.addEventListener("click", downloadImages);
