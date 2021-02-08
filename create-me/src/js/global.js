window.onload = function() {
  Particles.init({
    selector: '.hero-bg',
    color: ['#530a71', '#C4D4DA'],
    connectParticles: true
  });

  $( "section.skills" ).fadeIn( "slow" );
  
  new TypeIt('#element', {
      strings: ["Hello, I'm Stephanie Acevedo", "I am a Front-end Web Developer."],
      speed: 50,
      breakLines: false,
      autoStart: true
  });

  // Flyout Nav for mobile
  // Variables
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');

  // Hamburger, on click, open nav menu list and fade links in.
  hamburger.addEventListener('click', () =>{
    navLinks.classList.toggle('open');
    links.forEach(link => {
      link.classList.toggle('fade');
    });
  });

  // Swiper slider
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    speed: 600,
    parallax: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
};
