// Whole-script strict mode syntax
// JavaScript is very flexible
// flexible === dangerous
// added ECMAScript 5
"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

// 스크롤에 따른 navbar, home section 컨트롤
document.addEventListener("scroll", () => {
  // 스크롤이 최상단으로 올라오면 navbar 투명하게
  console.log(`스크롤Y: ${window.scrollY}`);
  console.log(`nav Height: ${navbarHeight}`);

  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }

  // 스크롤링에 따라 홈화면 투명도 변경
  home.style.opacity = `${1 - window.scrollY / homeHeight}`;
});

// navbar 메뉴 선택시 해당 메뉴로 이동(스크롤링)
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar 토클 버튼
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// contact 버튼 클릭시 contact 메뉴로 이동
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 최상단으로 이동하는 버튼 만들기 (화면 우측 하단)
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// 버튼 누르면 최상단으로 이동하기
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home")
});

// 프로젝트 테마별로 보여주기
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter;

  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  e.target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300)
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}
