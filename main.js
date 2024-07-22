// Добавление:
function add() {
  const element = document.querySelector(".imageContainer");
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("imageWrapper");
  element.append(imageWrapper);
  const image = document.createElement("img");
  image.src = "https://picsum.photos/300/200?random=" + Math.random();
  imageWrapper.append(image);
  let allImages = [];
  document.querySelectorAll(".imageWrapper").forEach((el) => {
    allImages.push(el.src);
  });
  const buttonRemove = document.querySelector(".buttonContainer");
  if (allImages.length > 1) {
    buttonRemove.firstElementChild.removeAttribute("disabled", false);
  }
  // Удаляем эффект после загрузки
  document.querySelectorAll("img").forEach((image) => {
    image.onload = (event) => event.target.classList.remove("loading");
  });
}
const buttonAdd = document.querySelector(".buttonContainer");
buttonAdd.lastElementChild.onclick = add;

// Удаление:
function remove() {
  const insertedImage = document.querySelector(".imageWrapper");
  insertedImage.remove();
  let allImages = [];
  document.querySelectorAll(".imageWrapper").forEach((el) => {
    allImages.push(el.src);
  });
  if (allImages.length < 2) {
    buttonRemove.firstElementChild.setAttribute("disabled", false);
  }
}
const buttonRemove = document.querySelector(".buttonContainer");
buttonRemove.firstElementChild.onclick = remove;

// Загрузка новых картинок:
function refresh() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    image.src = "https://picsum.photos/300/200?random=" + Math.random();
    image.classList.add("loading");
  });
}
const buttonNew = document.querySelector(".buttonContainer");
buttonNew.firstElementChild.nextElementSibling.onclick = refresh;
// Удаляем эффект после загрузки
document.querySelectorAll("img").forEach((image) => {
  image.onload = (event) => event.target.classList.remove("loading");
});

// Модальное окно:
function zoomIn(event) {
  if (event.target.tagName === "IMG") {
    const parent = event.target.parentElement;
    parent.classList.toggle("fullScreen");
  }
  if (event.target.classList.contains("fullScreen")) {
    event.target.classList.toggle("fullScreen");
  }
}
document.querySelector(".container").addEventListener("click", zoomIn);
