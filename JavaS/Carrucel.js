/* Carrucel de fotos */

const contenedor = document.querySelector('.contenedor');
const item = document.querySelectorAll('.item');
const anterior = document.querySelector('.anterior');
const siguiente = document.querySelector('.siguiente');

let currentIndex = 0;
let autoSlideInterval;

function updateCarrusel() {
    contenedor.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % item.length;
    updateCarrusel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + item.length) % item.length;
    updateCarrusel();
}

function autoSlide() {
    autoSlideInterval = setInterval(nextSlide, 2000); 
}

siguiente.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

anterior.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
}

autoSlide();