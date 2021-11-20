"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector("header");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn, i) => {
  btn.addEventListener("click", openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Removing Cookie message
const closeCookie = document.querySelector(".btn--close-cookie");
const cookie = document.querySelector(".cookie-message");

closeCookie.addEventListener("click", function () {
  cookie.classList.add("hide");
});
//Scroll
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

//Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
if (window.innerWidth < 426) {
  document.querySelectorAll(".nav__item").forEach(function (e, i) {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("nav__link--btn")) return;
      var id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      toggleMenuBarButtons();
    });
  });
} else {
  document
    .querySelector(".nav__links")
    .addEventListener("click", function abc(e) {
      e.preventDefault();
      navLinks.classList.toggle("nav-open");
      if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      }
    });
}

// document
//   .querySelector(".nav__links")
//   .addEventListener("click", function abc(e) {
//     // if (window.innerWidth < 426) {
//     //   navLinks.classList.toggle("nav-open");
//     //   this.removeEventListner("click", abc);
//     // }
//     e.preventDefault();
//     navLinks.classList.toggle("nav-open");
//     if (e.target.classList.contains("nav__link")) {
//       const id = e.target.getAttribute("href");
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     }
//   });

//Tabbed Components
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  //Active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  //Active content area
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    // const siblings = document.querySelectorAll('.nav__link');
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//Sticky Navigation
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Sticky navigation: Intersection Observer API
const obsCallback = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

//Reveal section
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
const loading = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  imgObserver.unobserve(entry.target);
};
// console.log(window.innerWidth);
if (window.innerWidth < 426) {
  var rootmargin = "-150px";
} else {
  rootmargin = "-200px";
}
// console.log(rootmargin);
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: [0, 0.1],
  rootMargin: rootmargin,
});

imgTargets.forEach((img) => imgObserver.observe(img));

//slider
let curSlide = 0;
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};
goToSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};
const prevSlide = function () {
  if (curSlide == 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

//Dot navigation
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
createDots();
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDot(0);

//Lectures
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// });
// window.addEventListener('load', function (e) {
//   console.log('page loaded completely');
// });
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

//MOBILE NAV
const toggleMenuBarButtons = function () {
  navLinks.classList.toggle("nav-open");
  menu.classList.toggle("hide");
  closeButton.classList.toggle("hide");
};
const navLinks = document.querySelector(".nav__links");
const menu = document.querySelector(".menu");
const closeButton = document.querySelector(".closeButton");
menu.addEventListener("click", function () {
  toggleMenuBarButtons();
});
closeButton.addEventListener("click", function () {
  toggleMenuBarButtons();
});
const operationsTab = document.querySelectorAll(".operations__tab");
var options = ["Transfers", "Loans", "Closing"];
if (window.innerWidth < 426) {
  operationsTab.forEach(function (e, i) {
    e.textContent = options[i];
  });
}
