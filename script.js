function toggleMenu(evt) {
  console.log("evt", evt);
  let nav = document.querySelector("#nav-list");
  console.log("nav", nav);
  if (nav.style.display === "block") {
    evt.target.innerText = "=";
    nav.style.display = "none";
    nav.style.transition = "opacity 0.1s ease-out";
    nav.style.opacity = 0;
  } else {
    evt.target.innerText = "x";
    nav.style.display = "block";
    nav.style.transition = "opacity 0.1s ease-in";
    nav.style.opacity = 1;
  }
  // after toggling the menu, header height may change — update background offset
  try {
    updateHeaderOffset();
  } catch (e) {
    /* ignore if function not yet defined */
  }
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // prevent default form submission
    event.preventDefault();

    // collect form data\
    const firstName = document.querySelector("#fname").value;
    const lastName = document.querySelector("#lname").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;

    // log form data to console
    console.log(`Form submitted: ${firstName} ${lastName} ${email} ${phone} `);

    // reset form
    document.getElementById("contactForm").reset();
  });

/* Ensure the background element starts below the header so it doesn't overlap
   the nav/header. We measure header height and expose it via --header-height. */
function updateHeaderOffset() {
  const header = document.querySelector("header");
  const bg = document.getElementById("background-image");
  if (!header || !bg) return;
  const h = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", h + "px");
}

window.addEventListener("DOMContentLoaded", updateHeaderOffset);
window.addEventListener("load", updateHeaderOffset);
window.addEventListener("resize", updateHeaderOffset);
