let nav = document.getElementById("nav");
let hamburger = document.getElementById("hamburger");
let navlinks = document.querySelector(".navlinks");
let bars = document.getElementById("bars");

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  let scrollTimeout;
  function handleScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      nav.classList.add("hide");
    } else if (currentScrollTop < lastScrollTop) {
      // Scrolling up
      nav.classList.remove("hide");
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        if (currentScrollTop === 0) {
          // At the top of the page, do not hide nav
          nav.classList.remove("hide");
        } else if (
          currentScrollTop !== 0 &&
          !navlinks.classList.contains("hide")
        ) {
          // After a delay, hide the nav again
          nav.classList.add("hide");
        }
      }, 2000);
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }
  window.addEventListener("scroll", handleScroll);
});

hamburger.addEventListener("click", function () {
  navlinks.classList.toggle("hide");
  bars.classList.toggle("rotate");
  //scroll page by 2px
  window.scrollBy(0, -2);
});

const main = document.getElementById("main");
const abt_sec = document.querySelector(".abt-sec")
const abt = document.querySelector(".abt")
const hero = document.getElementById("hero");
const skills = document.querySelector(".skills");
const colh22 = document.querySelector(".colh22");
const colh21 = document.querySelector(".colh21");

let newcondition = "";
let progress = "";


function initiateskill() {
  document.querySelectorAll(".prjskl").forEach((prjskl) => {
    const progressRing = prjskl.querySelector(".progress-ring");
    const circle = progressRing.querySelector(".progress-ring__circle");
    const backgroundCircle = progressRing.querySelector(
      ".progress-ring__background"
    );
    function getComputedRadius(element) {
      const styles = window.getComputedStyle(element);
      const r = parseFloat(styles.getPropertyValue("r"));
      return r;
    }

    const radius = getComputedRadius(circle);
    const circumference = 2 * Math.PI * radius;
    const arcLength = (3 / 4) * circumference; // 270 degrees is 3/4 of the full circle
    const progressText = prjskl.querySelector(".progress-text"); // Changed to prjskl.querySelector

    // Setup background circle
    backgroundCircle.style.strokeDasharray = `${arcLength} ${circumference}`;
    backgroundCircle.style.strokeDashoffset = 0; // Always shows the full 270-degree arc

    // Setup progress circle
    circle.style.strokeDasharray = `${arcLength} ${circumference}`;
    circle.style.strokeDashoffset = arcLength;

    function setProgress(percent) {
      const offset = arcLength - (percent / 100) * arcLength;
      circle.style.strokeDashoffset = offset;
      progressText.textContent = `${percent}%`;
    }

    let progressc = 0;
    const percent = parseInt(circle.getAttribute("percent"), 10);
    const interval = setInterval(() => {
      if (progressc > percent) {
        clearInterval(interval);
      } else {
        setProgress(progressc);
        progressc++;
      }
    }, 30);
  });

}


function handleScrollmain() {
  const rect_abt_sec = abt_sec.getBoundingClientRect();
  const rect_hero = hero.getBoundingClientRect();
  const rect_skills = skills.getBoundingClientRect();

  let setcondition = "";

  if (rect_abt_sec.top <= window.innerHeight && rect_abt_sec.top >= 0) {
    setcondition = "entered";
  } else if (rect_abt_sec.top <= 0) {
    setcondition = "top crossed";
  }

  if (rect_abt_sec.bottom <= window.innerHeight) {
    setcondition = "bottom crossed";
  }

  if (newcondition !== setcondition) {
    newcondition = setcondition;
    alert();
  }

  //her-section Animation
  if (rect_hero.top <= window.innerHeight - 50 && rect_hero.bottom >= 300) {
    colh21.classList.remove("hide")
    colh22.classList.remove("hide")
  } else {
    colh21.classList.add("hide")
    colh22.classList.add("hide")
  }

  // console.log(main.offsetHeight, rect_abt_sec.top, rect_abt_sec.bottom);
  var progress_area = abt_sec.offsetHeight - window.innerHeight;
  var currentposition = -rect_abt_sec.top / progress_area;
  var abt_projects = document.querySelector(".abt-projects");
  var abt_counter = document.querySelector(".abt-counter");
  var abt_wrap = document.querySelector(".abt-wrap");
  var progress_bar = document.querySelector(".prgbr");



  if (currentposition >= 1) {
    currentposition = 1;
  }

  progress = Math.round(currentposition * 100) + "%";
  progress_bar.style.height = progress;
  if (currentposition >= -0.25 && currentposition <= 0.3) {
    abt_wrap.classList.remove("hide");
    abt_counter.classList.add("hide");
    abt_projects.classList.add("hide");
  } else if (currentposition > 0.3 && currentposition <= 0.6) {
    abt_wrap.classList.remove("hide");
    abt_counter.classList.remove("hide");
    abt_projects.classList.add("hide");
  }
  else if (currentposition > 0.6 && currentposition <= 1) {
    abt_wrap.classList.remove("hide");
    abt_counter.classList.remove("hide");
    abt_projects.classList.remove("hide");
  } else {
    abt_wrap.classList.add("hide");
    abt_counter.classList.add("hide");
    abt_projects.classList.add("hide");
  }

  // console.log(progress)

  if (
    rect_skills.top <= window.innerHeight / 4 &&
    rect_skills.top >= window.innerHeight / 5
  ) {
    initiateskill();
  }
  

}

handleScrollmain()

function alert() {
  if (newcondition === "entered") {
    abt.classList.remove("abtm", "fx");
    abt.classList.add("abtp");
    // console.log("Element is in view", progress);
  }
  if (newcondition === "top crossed") {
    abt.classList.remove("abtp", "abtm");
    abt.classList.add("fx");

    // console.log("Element is above view", progress);
  }
  if (newcondition === "bottom crossed") {
    abt.classList.remove("fx", "abtp");
    abt.classList.add("abtm");
    // console.log("Element is below view", progress);
  }
}

window.addEventListener("scroll", handleScrollmain);



