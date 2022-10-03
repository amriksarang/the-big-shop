const handleNav = () => {
    
let primaryMenuElement = document.getElementsByClassName("nav-links")[0];
let primaryMenuElementHeight = primaryMenuElement.offsetHeight;
let primaryMenuElementLeft = primaryMenuElement.offsetLeft;

let secondaryMenuElement = document.getElementsByClassName("categories")[0];
secondaryMenuElement.style.left = primaryMenuElementLeft + "px";
secondaryMenuElement.style.top = 2 * primaryMenuElementHeight+ 30 + "px";

let allNavLink = document.querySelector(".nav-links li:first-child");

allNavLink.addEventListener('mouseenter', function (e) {
        secondaryMenuElement.classList.add('nav-link-mouseover');
    });
	
allNavLink.addEventListener('mouseleave', function (e) {
        secondaryMenuElement.classList.remove('nav-link-mouseover');
    });

document.querySelector(".hamburger-icon").addEventListener("click", function(){
	secondaryMenuElement.style.display = "inline-flex";
});

document.querySelector(".categories").addEventListener("click", function(){
	secondaryMenuElement.style.display = "none";
});
}

export default handleNav;
