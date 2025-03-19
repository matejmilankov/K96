// Lenis Smooth Scroll 
let lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.8,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
//------------------------------------------------------------


// Get on top after refresh, stop and star scrolling functions
window.onload = function () {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
}

function disableScroll() {
    lenis.stop();
}
function enableScroll() {
    lenis.start();
}
disableScroll()
//------------------------------------------------------------


// Landing Animation
const tl = gsap.timeline();

tl.from(".letter", {
    duration: 0.8,
    y: -20,
    opacity: 0,
    stagger: 0.1
})

.to({}, { duration: 2 })  

.to(".top-left, .top-right", { top: 0, duration: 2, ease: "power3.inOut" },  "-=2") 
.to(".bottom-right", { bottom: 0, duration: 2, ease: "power3.inOut" }, "-=2") 

.to(".top-left", { left: 0, duration: 2, ease: "power3.inOut" })
.to(".top-right", { right: 0, duration: 2, ease: "power3.inOut" }, "-=2")

.to(".bottom-right", { right: 0, duration: 2, ease: "power3.inOut" }, "-=2")

.to(".block-left", { left: "-50%", duration: 2, ease: "power3.inOut" }, "-=2")
.to(".block-right", { right: "-50%", duration: 2, ease: "power3.inOut", onComplete: enableScroll }, "-=2");
//------------------------------------------------------------------------------------


// Fashion Show Intro Animation
gsap.registerPlugin(ScrollTrigger);

$(".location-intro-wrap").each(function (index) {
  let triggerElement = $(this);
  let targetElementOne = $(".location-intro-first-h");
  let targetElementTwo = $(".location-intro-second-h");

  let scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 3
    }
  });
  scrollTl.from(targetElementOne, {
    x: "-50vw"
  }).from(targetElementTwo, {
    x: "50vw"
  }, "<")
});
//------------------------------------------------------------------------------------


// Intro Heading Animation
let triggerElement = document.querySelector(".intro-content-flex");
gsap.from(".intro-heading", {
  duration: 0.8,
  y: -20,
  opacity: 0,
  stagger: 0.2,
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: triggerElement,
    start: "top 80%"
  }
});
//------------------------------------------------------------------------------------


// About Circle Animation
$(".intro-about-wrap").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".intro-about-circle");

  let scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 3
    }
  });
  scrollTl.fromTo(targetElement, {
    width: "5rem",
    height: "5rem",
    borderRadius: "100%"
  },
  {
    width: "100vw",
    height: "100vh",
    borderRadius: "0%"
  }
)
});
//------------------------------------------------------------------------------------


// Models Scale Animation
let items = gsap.utils.toArray(".model-item");

items.forEach((item, i) => {
  gsap.from(item, {
    scale: 0.8,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      end: "top top",
      scrub: true
    }
  });
});
//------------------------------------------------------------------------------------


// Swiper Testimonial Slider
let contentSwiper = new Swiper(".swiper.is-content", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  grabCursor: true,
  keyboard: true,
  followFinger: false,
  navigation: {
    nextEl: ".arrow.is-right",
    prevEl: ".arrow.is-left",
    disabledClass: "is-disabled"
  }
});

contentSwiper.on('slideChange', () => {
  function animateElements(elements, animationOptions, timeline) {
    elements.forEach((element) => {
      timeline.from(element, animationOptions, '<0.2');
    });
  }

  const activeIndex = contentSwiper.activeIndex;
  const activeSlide = document.querySelector(`.swiper.is-content .swiper-slide:nth-child(${activeIndex + 1})`);

  const personInfo = activeSlide.querySelectorAll('.person-info');
  const personComment = activeSlide.querySelectorAll('.person-comment');

  const commonAnimationOptions = {
    y: "65",
    opacity: 0,
    ease: "power3.inOut",
    duration: 1.4,
  }
  
  const tl = gsap.timeline();

  animateElements(personInfo, commonAnimationOptions, tl);
  animateElements(personComment, commonAnimationOptions, tl);

});
//------------------------------------------------------------------------------------


// About Paragraph Animtion
window.addEventListener("DOMContentLoaded", (event) => {
  let typeSplit = new SplitType("[text-split]", {
    types: "words",
    tagName: "span",
  });

  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 80%",
      onEnter: () => timeline.play(),
    });
  }

  $("[rows-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      yPercent: 100,
      ease: "power1.inOut",
      transformOrigin: "top center",
      stagger: { amount: 0.8 },
    });
    createScrollTrigger($(this), tl);
  });

  
  gsap.set("[text-split]", { opacity: 1 });
});
//------------------------------------------------------------------------------------


// Form
document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll('.form-step');
  const nextButtons = document.querySelectorAll('.form-btn.is-next');
  const prevButtons = document.querySelectorAll('.form-btn.is-prev');
  const submitButton = document.querySelector('.submit-button');
  const progressNav = document.querySelectorAll('.form-navigation');
  let errors = {
    "name": [],
    "email": [],
    "country": [],
    "age": []
  }
  let currentStep = 0;

  function initializeNiceSelect() {
      // Destroy existing instances of Nice Select
      $('select').niceSelect('destroy');
      // Reinitialize Nice Select
      $('select').niceSelect();
  }

  function showStep(step) {
    steps.forEach((stepElement) => {
        stepElement.style.display = 'none';
    });

    steps[step].style.display = 'block';
    let childrenElementes = steps[step].querySelectorAll("*");

    gsap.fromTo(childrenElementes, 
        { opacity: 0, 
          y: "65" 
        },
        { opacity: 1,
          y: 0, 
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1
        }
    );

    // Ponovno inicijalizujemo Nice Select ako postoji na tom koraku
    if (steps[step]) {
        $(steps[step]).find('select').niceSelect();
    }

    if (step === steps.length - 1) {
        progressNav.forEach(nav => nav.style.display = 'none');
        submitButton.style.display = 'block';
    } else {
        progressNav.forEach(nav => nav.style.display = 'flex');
        submitButton.style.display = 'none';
    }
}



function secondValidateStep(step) {
    const inputs = steps[step].querySelectorAll('.input-field');
    let valid = true;

    inputs.forEach(input => {
        let inputValue = input.value;
        let inputName = input.name;

        errors[inputName] = [];
        
        if (inputValue.length > 1) {
            
            switch(inputName) {
              case 'name':
                if (!validateNameAndCountry(inputValue)) {
                  errors[inputName].push("Only letters are allowed");
                  valid = false;
                }
                break;
              case 'email':
                if (!validateEmail(inputValue)) {
                  errors[inputName].push("Email is inncorect");
                  valid = false;
                }
                break;
              case 'country':
                if (!validateNameAndCountry(inputValue)) {
                  errors[inputName].push("Only letters are allowed");
                  valid = false;
                }
                break;
              case 'age':
                if (!validateAge(inputValue)) {
                  errors[inputName].push("Only numbers are allowed");
                  valid = false;
                }
            }
        }
          else if (inputValue.length === 0) {
            errors[inputName].push("Please fill out field");
            valid = false;
          }
        else {
            errors[inputName].push("Two letters are minimum");
          valid = false;
        }

        populateErrors();
    });

    return valid;
}

function populateErrors() {

  for (elem of document.querySelectorAll('ul')) {
    console.log("Obrisane liste");
    elem.remove();
  }

  for(key of Object.keys(errors)) {
    let input = document.querySelector(`input[name = "${key}"]`);
    let parentElement = input.parentElement;
    let errorsElement = document.createElement('ul');
    parentElement.appendChild(errorsElement);

    errors[key].forEach((error) => {
      let li = document.createElement('li');
      li.innerText = error;
      errorsElement.appendChild(li);
    })
  }
}

function validateNameAndCountry(name) {
  if (/^[a-zA-Z\s]*$/.test(name)) {
    return true;
  }
  return false;
} 

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validateAge(age) {
  if (/^\d+$/.test(age)) {
    if (parseInt(age) < 99) {
      return true;
    }
  }
  return false;
}

let ageName = document.querySelector('input[name = "age"]');
ageName.addEventListener('change', () => {
  if (secondValidateStep(currentStep)) {
    submitButton.style.pointerEvents = "auto";
    submitButton.style.opacity = "1";
  } else {
    submitButton.style.pointerEvents = "none";
    submitButton.style.opacity = "0.5";
  }
})

// Show initial step and initialize Nice Select
showStep(currentStep);
initializeNiceSelect();

nextButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (secondValidateStep(currentStep)) {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});
});
