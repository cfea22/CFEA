document.addEventListener("DOMContentLoaded", function () {
  // Chat Widget Toggle
  const chatButton = document.querySelector(".chat-button");
  const chatBox = document.querySelector(".chat-box");
  const closeChat = document.querySelector(".close-chat");

  if (chatButton && chatBox && closeChat) {
    chatButton.addEventListener("click", () => {
      chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
    });

    closeChat.addEventListener("click", () => {
      chatBox.style.display = "none";
    });
  }

  // Cookie Consent
  const cookieConsent = document.querySelector(".cookie-consent");
  const acceptBtn = document.querySelector(".cookie-btn.accept");
  const rejectBtn = document.querySelector(".cookie-btn.reject");

  if (!localStorage.getItem("cookieConsent")) {
    cookieConsent.style.display = "block";
  }

  const handleCookieConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    cookieConsent.style.display = "none";
  };

  if (acceptBtn) acceptBtn.addEventListener("click", () => handleCookieConsent("accepted"));
  if (rejectBtn) rejectBtn.addEventListener("click", () => handleCookieConsent("rejected"));

  // Active Nav Highlight (Optional Enhancement)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-container a");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});
