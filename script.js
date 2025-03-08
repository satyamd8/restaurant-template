document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let slideIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slider img');
        const maxIndex = Math.ceil(slides.length / 2) - 1;

        // Handle wraparound
        if (index > maxIndex) slideIndex = 0;
        if (index < 0) slideIndex = maxIndex;
        
        // Move by 100% of container width each time
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        slideIndex--;
        showSlide(slideIndex);
    });

    nextBtn.addEventListener('click', () => {
        slideIndex++;
        showSlide(slideIndex);
    });
});