document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.card-carousel');

  carousels.forEach(carousel => {
    const slides = carousel.querySelector('.slides');
    const total = slides.children.length;
    let idx = 0;
    let intervalId;

    function showSlide(i) {
      idx = (i + total) % total;
      slides.style.transform = `translateX(-${idx * 100}%)`;
    }

    function startAutoScroll() {
      intervalId = setInterval(() => showSlide(idx + 1), 5000);
    }

    function stopAutoScroll() {
      clearInterval(intervalId);
    }

    carousel.querySelector('.prev').addEventListener('click', () => {
      stopAutoScroll();
      showSlide(idx - 1);
      startAutoScroll();
    });

    carousel.querySelector('.next').addEventListener('click', () => {
      stopAutoScroll();
      showSlide(idx + 1);
      startAutoScroll();
    });

    // pause on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // initialize
    showSlide(0);
    startAutoScroll();
  });
});
