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

      // simple, more permissive email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // helper to set an error message if an element exists
      function setError(msg) {
        if (errorMsg) {
          errorMsg.innerText = msg;
        } else {
          console.warn(msg);
        }
      }

      // validate required fields (at least provide an email or a name)
      if (firstName === "" && lastName === "" && email === "") {
        setError("Please enter required fields.");
        return;
      }
      if (email && !emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      // submit form

      if (errorMsg) {
        errorMsg.innerText = ""; // clear any previous error messages
      }

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

      let recipient = "amortiz@batestech.com";
      const mailtoAnchor = document.querySelector('a[href^="mailto:"]');
      if (mailtoAnchor) {
        try {
          const href = mailtoAnchor.getAttribute("href");
          const parsed = href.replace(/^mailto:/i, "").split("?")[0];
          if (parsed) recipient = parsed;
        } catch (e) {
          console.warn(
            "Could not parse mailto anchor, using default recipient",
            e
          );
        }
      }

      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // Open the mailto link
      window.location.href = mailtoLink;

      // reset form
      document.getElementById("contactForm").reset();
    });
  }
});
