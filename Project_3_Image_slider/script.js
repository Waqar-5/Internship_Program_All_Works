const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
let autoPlay;

slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function startAutoPlay(){
    autoPlay = setInterval(nextSlide, 3000);
}

function stopAutoPlay(){
    clearInterval(autoPlay);
}

startAutoPlay();

const sliderContainer = document.querySelector(".slider-container");

sliderContainer.addEventListener("mouseenter", stopAutoPlay);
sliderContainer.addEventListener("mouseleave", startAutoPlay);

document.addEventListener("keydown", (e) => {

    if(e.key === "ArrowRight"){
        nextSlide();
    }

    if(e.key === "ArrowLeft"){
        prevSlide();
    }
});