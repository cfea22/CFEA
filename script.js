document.addEventListener("DOMContentLoaded", () => {
  // ===== Cookie Consent =====
  const cookiePopup = document.getElementById('cookie-consent-popup');
  const cookieAccept = document.getElementById('cookie-consent-accept');
  const cookieReject = document.getElementById('cookie-consent-reject');

  if (cookiePopup && !localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookiePopup.style.display = 'block';
      cookiePopup.style.opacity = '0';
      cookiePopup.style.transition = 'opacity 0.5s ease';
      requestAnimationFrame(() => {
        cookiePopup.style.opacity = '1';
      });
    }, 2000);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookiePopup.style.opacity = '0';
      setTimeout(() => cookiePopup.style.display = 'none', 300);
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'rejected');
      cookiePopup.style.opacity = '0';
      setTimeout(() => cookiePopup.style.display = 'none', 300);
    });
  }

  // ===== Chat Widget =====
  const chatButton = document.getElementById('chatButton');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const userMessage = document.getElementById('userMessage');
  const sendMessage = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const formMessage = document.getElementById('formMessage');

  if (chatButton && chatBox) {
    chatButton.addEventListener('click', () => {
      if (chatBox.style.display === 'block') {
        chatBox.style.display = 'none';
      } else {
        chatBox.style.display = 'block';
        chatBox.style.opacity = '0';
        requestAnimationFrame(() => {
          chatBox.style.transition = 'opacity 0.3s ease';
          chatBox.style.opacity = '1';
        });
        userMessage?.focus();
      }
    });
  }

  if (closeChat && chatBox) {
    closeChat.addEventListener('click', () => {
      chatBox.style.opacity = '0';
      setTimeout(() => {
        chatBox.style.display = 'none';
      }, 200);
    });
  }

  function sendMessageHandler() {
    if (!userMessage || !chatMessages) return;
    const message = userMessage.value.trim();
    if (message) {
      const userMsgElement = document.createElement('div');
      userMsgElement.className = 'chat-message user-message';
      userMsgElement.innerHTML = `<p>${message}</p>`;
      chatMessages.appendChild(userMsgElement);

      userMessage.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const botMsgElement = document.createElement('div');
        botMsgElement.className = 'chat-message bot-message';
        botMsgElement.innerHTML = `<p>Thanks for your message! We'll get back to you soon.</p>`;
        chatMessages.appendChild(botMsgElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  if (sendMessage) {
    sendMessage.addEventListener('click', sendMessageHandler);
  }

  if (userMessage) {
    userMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessageHandler();
      }
    });
  }

  if (chatMessages && chatForm && formMessage) {
    chatMessages.addEventListener('DOMNodeInserted', (e) => {
      if (e.target.classList.contains('user-message')) {
        formMessage.value = e.target.textContent.trim();
        chatForm.submit();
      }
    });
  }

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Active Nav Link Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-container a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 2) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== Course Card Animation =====
  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(card => {
    card.style.transition = 'transform 0.3s ease';
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});
