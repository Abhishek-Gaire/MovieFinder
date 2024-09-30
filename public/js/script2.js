//to scroll through the movie / tv cards
function scrollCard(e) {
  let parent = e.parentElement;
  let val = 850;
  if (e.classList.contains("left")) {
    // i want to scroll to left i want to decrease the left value so it is made negative
    val = -val;
  }
  parent.scrollBy({
    left: val,
    behavior: "smooth",
  });
  setTimeout(() => updateVisibility(e), 500);
}
function updateVisibility(e) {
  //to update the visibility of the left and right button if we cant scroll on certain direction then hide the button
  let parent = e.parentElement;
  let leftBtn = parent.querySelector(".btn-cont.left");
  let rightBtn = parent.querySelector(".btn-cont.right");
  if (parent.scrollLeft === 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
  }

  //this condition checks if the scrolling content reached the right most end or not
  //scrollLeft gives the length the parent has scrolled from left and client width gives the length of width visible to us and the scrollWidth is the total width of the parent upto which it can be scrolled in

  if (parent.scrollLeft + parent.clientWidth >= parent.scrollWidth) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "block";
  }
}

var lastScrollTop = 0;
nav = document.querySelector("header");
window.addEventListener("scroll", () => {
  var scrollTop = window.scrollY; //
  if (scrollTop > lastScrollTop) {
    nav.style.top = "-100px";
  } else {
    nav.style.top = "0px";
  }
  lastScrollTop = scrollTop;
});
