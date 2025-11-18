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
}

document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // prevent default form submission
      event.preventDefault();

      // collect form data\
      const firstName = document.querySelector("#fname").value;
      const lastName = document.querySelector("#lname").value;
      const email = document.querySelector("#email").value;
      const phone = document.querySelector("#phone").value;
      const message = document.querySelector("#message").value;
      const errorMsg = document.querySelector(".error");

      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,3}/;

      // validate email format
      if (firstName === "" && lastName === "" && email === "") {
        errorMsg.innerText = "Please enter required fields.";
      }
      if (!emailRegex.test(email)) {
        errorMsg.innerText = "Please enter a valid email address.";
        return;
      }

      // submit form

      errorMsg.innerText = ""; // clear any previous error messages

      // build the mailto form
      const subject = encodeURIComponent(
        `Contact Form Submission from ${firstName} ${lastName}`
      );
      const body = encodeURIComponent(
        `Name: ${firstName} ${lastName} \r\n` +
          `Email: ${email} \r\n` +
          `Phone: ${phone} \r\n` +
          `Message: ${message}`
      );

      const recipient = "amortiz@batestech.com";
      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // open the mailto link
      window.location.href = mailtoLink;

      // reset form
      document.getElementById("contactForm").reset();
    });
  }
});
