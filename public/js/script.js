function toggleOverview(e) {
  let overview = document.querySelector("#overview");
  let overviewData = overview.innerText;
  if (overviewData.length < 120) {
    document.querySelector("#readMore").style.display = "none";
    overview.style.webkitLineClamp = "3";
  }
  overview.classList.toggle("active");
  if (e.innerText === "Read More") {
    e.innerText = "Read Less";
  } else {
    e.innerText = "Read More";
  }
}
function scrollCard(e) {
  let parent = e.parentElement;
  let val = 850;
  if (e.classList.contains("left")) {
    val = -val;
  }
  parent.scrollBy({
    left: val,
    behavior: "smooth",
  });
  setTimeout(() => updateVisibility(e), 500);
}
function updateVisibility(e) {
  let parent = e.parentElement;
  let leftBtn = parent.querySelector(".btn-cont.left");
  let rightBtn = parent.querySelector(".btn-cont.right");
  if (parent.scrollLeft === 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "block";
  }
  if (parent.scrollLeft + parent.clientWidth >= parent.scrollWidth) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "block";
  }
}
var lastScrollTop = 0;
nav = document.querySelector("header");
window.addEventListener("scroll", () => {
  var scrollTop = window.pageYOffset; //
  if (scrollTop > lastScrollTop) {
    nav.style.top = "-100px";
  } else {
    nav.style.top = "0px";
  }
  lastScrollTop = scrollTop;
});
