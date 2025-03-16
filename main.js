let imagesData = []; // Данные из JSON
let currentImages = []; // Изображения, отображаемые в данный момент

// Загрузка данных из JSON
async function loadImagesData() {
    const response = await fetch('mock.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    imagesData = await response.json();
    initializeImages();
    renderImages();
    updateButtonStates();
}

// Инициализация начальных изображений
function initializeImages() {
    currentImages = [];
    for (let i = 0; i < Math.min(4, imagesData.length); i++) {
        currentImages.push(getRandomImage());
    }
}

// Рендеринг изображений на основе currentImages
function renderImages() {
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = ''; // Очищаем контейнер перед рендерингом

    currentImages.forEach(image => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("imageWrapper");
        const img = document.createElement('img');
        img.src = image.download_url;
        img.addEventListener('click', zoomIn); // Добавляем обработчик события zoomIn
        imageWrapper.appendChild(img);
        imageContainer.appendChild(imageWrapper);
    });
    updateRemoveButtonState();
}

// Добавление изображения
function add() {
    if (imagesData.length > currentImages.length) {
        currentImages.push(getRandomImage());
        renderImages();
        updateButtonStates();
    }
}

// Удаление изображения
function remove() {
    currentImages.pop();
    renderImages();
    updateButtonStates();
}

// Обновление изображений
function refresh() {
    for (let i = 0; i < currentImages.length; i++) {
        currentImages[i] = getRandomImage();
    }
    renderImages();
    updateButtonStates();
}

// Получение случайного изображения, которого еще нет в currentImages
function getRandomImage() {
    let randomImage = imagesData[Math.floor(Math.random() * imagesData.length)];
    return randomImage;
}

// Модальное окно
function zoomIn(event) {
    if (event.target.tagName === "IMG") {
        const imageWrapper = event.target.closest(".imageWrapper");
        imageWrapper.classList.toggle("fullScreen");
    }
}

// Функция для закрытия модального окна по клику вне картинки
function closeModal(event) {
    if (event.target.classList.contains('fullScreen')) {
        event.target.classList.remove('fullScreen');
    }
}

// Обновление состояния кнопки "Remove"
function updateRemoveButtonState() {
    const removeButton = document.querySelector(".buttonContainer button:first-child");
    removeButton.disabled = currentImages.length <= 1;
}

// Обновление состояния кнопок
function updateButtonStates() {
    const addButton = document.querySelector(".buttonContainer button:last-child");
    addButton.disabled = imagesData.length <= currentImages.length;
    const refreshButton = document.querySelector(".buttonContainer button:nth-child(2)");
    refreshButton.disabled = imagesData.length === 0; // Деактивировать, если нет данных
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', loadImagesData);
document.querySelector(".buttonContainer button:first-child").addEventListener("click", remove);
document.querySelector(".buttonContainer button:nth-child(2)").addEventListener("click", refresh);
document.querySelector(".buttonContainer button:last-child").addEventListener("click", add);

// Обработчик для закрытия модального окна при клике вне изображения
document.querySelector(".container").addEventListener("click", closeModal);
