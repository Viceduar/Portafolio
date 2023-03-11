"use strict";

const header = document.querySelector(".header__container");

header.addEventListener("mouseover", (e) => {
  const element = e.target.closest(".header__element");

  if (!element) return;

  const title = element.querySelector(".title-page");
  const description = element.querySelector(".description-box");

  title.classList.add("hidden");
  description.classList.remove("hidden");

  element.addEventListener("mouseout", () => {
    title.classList.remove("hidden");
    description.classList.add("hidden");
  });
});
