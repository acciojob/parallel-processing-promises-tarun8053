// SAFE LOOKUPS
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// prevent null errors
if (!output || !btn || !loading || !error) {
  console.error("Required DOM elements missing!");
}

// Images array
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "httpsum.photos/id/239/200/300" }
];

// Function to download one image safely
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${url}`));

    img.src = url;
  });
}

// Download all images
function downloadImages() {
  if (!output || !loading || !error) return;

  output.innerHTML = "";
  error.innerHTML = "";
  loading.style.display = "block";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      loading.style.display = "none";

      loadedImages.forEach(img => {
        if (output) output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.style.display = "none";
      if (error) error.textContent = err.message;
    });
}

// Safe event listener
if (btn) {
  btn.addEventListener("click", downloadImages);
}
