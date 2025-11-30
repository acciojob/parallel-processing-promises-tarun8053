// your JS code here.

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function which downloads all images in parallel
function downloadImages() {
  output.innerHTML = "";
  error.innerHTML = "";

  // Show loading spinner
  loading.style.display = "block";

  const downloadPromises = images.map((imgObj) =>
    downloadImage(imgObj.url)
  );

  Promise.all(downloadPromises)
    .then((loadedImages) => {
      // Hide loading spinner
      loading.style.display = "none";

      // Display all downloaded images
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      loading.style.display = "none";
      error.innerHTML = err; // show error message
    });
}

// Click event
btn.addEventListener("click", downloadImages);
