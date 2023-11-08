//Variables
const navBar = document.querySelector(".main-navigation__nav");
const navBarMobile = document.querySelector(".main-navigation__mobile");
const toggleBtn = document.querySelector(".main-navigation__toggle-btn");
const dropdownBg = document.querySelector(".main-navigation__dropdown-bg");
const btnDropdown = document.querySelectorAll(
  ".main-navigation__dropdown-button--mobile-dropdown"
);
const btnDropdownDesktop = document.querySelectorAll(
  ".main-navigation__dropdown-button--desktop-dropdown"
);

function changeAttribute(item1, item2, state) {
  item1.setAttribute("data-visible", state);
  item2.setAttribute("aria-expanded", state);
}

function replaceDropdownAni() {
  btnDropdownDesktop.forEach((item) => {
    if (item.nextElementSibling.classList.contains("dropdown-from-right"))
      item.nextElementSibling.classList.replace(
        "dropdown-from-right",
        "dropdown-from-top"
      );
    if (item.nextElementSibling.classList.contains("dropdown-from-left"))
      item.nextElementSibling.classList.replace(
        "dropdown-from-left",
        "dropdown-from-top"
      );
  });
}

function HideAfterAnimationEnds(element) {
  navBar.addEventListener(
    "animationend",
    () => {
      element.setAttribute("data-visible", false);
      navBar.classList.remove("fade-out");
    },
    {
      once: true,
    }
  );
}

//For hamburger button to open and close mobile menu
toggleBtn.addEventListener("click", () => {
  const visibility = navBarMobile.getAttribute("data-visible");
  if (visibility === "false") {
    navBar.classList.add("fade-in");
    changeAttribute(navBarMobile, toggleBtn, true);
    document.body.classList.add("no-scroll");
  } else {
    navBar.classList.replace("fade-in", "fade-out");
    toggleBtn.setAttribute("aria-expanded", false);
    // changeAttribute(navBarMobile, toggleBtn, false);
    HideAfterAnimationEnds(navBarMobile);
    document.body.classList.remove("no-scroll");
  }
});

//For each dropdown from mobile Menu
btnDropdown.forEach((btn) => {
  btn.addEventListener("click", () => {
    let itemButton = btn;
    let itemDropwdown = btn.nextElementSibling;
    let visibilityDropdown = itemDropwdown.getAttribute("data-visible");
    if (visibilityDropdown === "false") {
      changeAttribute(itemDropwdown, itemButton, true);
      itemButton.classList.add("btn-active");
    } else {
      changeAttribute(itemDropwdown, itemButton, false);
      itemButton.classList.remove("btn-active");
    }
  });
});

//For each dropdown from Desktop Menu
let itemParent;
let itemButton;
let itemDropwdown;

btnDropdownDesktop.forEach((btn) => {
  btn.addEventListener("click", () => {
    itemParent = btn.parentElement;
    itemButton = btn;
    itemDropwdown = btn.nextElementSibling;
    let visibilityDropdown = itemDropwdown.getAttribute("data-visible");
    btnDropdownDesktop.forEach((item) => {
      if (item.parentElement.id !== itemParent.id) {
        changeAttribute(item.nextElementSibling, item, false);
        item.classList.remove("btn-active");
      }
      if (
        itemParent.id == "explore-item" &&
        item.parentElement.id == "products-item"
      ) {
        item.nextElementSibling.classList.replace(
          "dropdown-from-top",
          "dropdown-from-left"
        );
      } else if (
        itemParent.id == "products-item" &&
        item.parentElement.id == "explore-item"
      ) {
        item.nextElementSibling.classList.replace(
          "dropdown-from-top",
          "dropdown-from-right"
        );
      }
    });
    if (
      itemParent.id == "products-item" &&
      !dropdownBg.classList.contains("dropdown-bg-expand")
    ) {
      dropdownBg.classList.add("dropdown-bg-expand");
    } else {
      dropdownBg.classList.remove("dropdown-bg-expand");
    }
    if (visibilityDropdown === "false") {
      changeAttribute(itemDropwdown, itemButton, true);
      itemButton.classList.add("btn-active");
      document.addEventListener("click", closeDesktopDropdown);
    } else {
      changeAttribute(itemDropwdown, itemButton, false);
      itemButton.classList.remove("btn-active");
      replaceDropdownAni();
      document.removeEventListener("click", closeDesktopDropdown);
    }
  });
});

const closeDesktopDropdown = (e) => {
  if (!itemParent.contains(e.target)) {
    if (
      itemParent.id == "products-item" &&
      dropdownBg.classList.contains("dropdown-bg-expand")
    ) {
      dropdownBg.classList.remove("dropdown-bg-expand");
    }
    replaceDropdownAni();
    changeAttribute(itemDropwdown, itemButton, false);
    itemButton.classList.remove("btn-active");
    document.removeEventListener("click", closeDesktopDropdown);
  }
};
