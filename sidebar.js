//--------------Sidebar & Menu Setup-------------

const cartIcon = document.querySelector(".shopping-cart");
const sideBar = document.querySelector(".sidebar")
const overlay = document.querySelector(".overlay");

const showSideBar = () => {
    sideBar.style.transform = "translateX(0%)";
    overlay.style.display = "block";
    // pt a bloca scroll-ul: document.body.style.overflow = "hidden";
};

const hideSideBar = () => {
    sideBar.style.transform = "translateX(448px)";
    overlay.style.display = "none";
    // pt a debloca scroll-ul: document.body.style.overflow = "auto";
};

cartIcon.addEventListener("click", showSideBar);
overlay.addEventListener("click", hideSideBar);

