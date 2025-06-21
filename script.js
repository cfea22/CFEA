// ===== Document Ready Function =====
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCookieConsent();
  initChatWidget();
  setupMobileNavigation();
  setupSmoothScrolling();
  setupActiveNavHighlight();
  setupCourseCardAnimations();
  setupFormSubmission();
  updateCurrentYear();
});

// ===== Cookie Consent =====
function initCookieConsent() {
  const cookiePopup = document.getElementById('cookie-consent-popup');
  const cookieAccept = document.getElementById('cookie-consent-accept');
  const cookieReject = document.getElementById('cookie-consent-reject');
  
  if (!cookiePopup || !cookieAccept || !cookieReject) return;
  
  // Check if user has already made a choice
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookiePopup.style.display = 'block';
    }, 2000);
  }
  
  // Handle accept button
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookiePopup(cookiePopup);
    loadAnalytics();
  });
  
  // Handle reject button
  cookieReject.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    hideCookiePopup(cookiePopup);
  });
  
  // Handle escape key to close popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cookiePopup.style.display === 'block') {
      hideCookiePopup(cookiePopup);
    }
  });
}

function hideCookiePopup(popup) {
  popup.style.animation = 'fadeOut 0.3s forwards';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 300);
}

function loadAnalytics() {
  // Placeholder for analytics loading
  console.log('Analytics loaded');
}

// ===== Chat Widget =====
function initChatWidget() {
  const chatButton = document.getElementById('chatButton');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const userMessage = document.getElementById('userMessage');
  const sendMessage = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');
  
  if (!chatButton || !chatBox) return;
  
  // Toggle chat box
  chatButton.addEventListener('click', toggleChat);
  
  // Close chat
  if (closeChat) {
    closeChat.addEventListener('click', () => {
      chatBox.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        chatBox.style.display = 'none';
      }, 300);
    });
  }
  
  // Send message functionality
  if (sendMessage && userMessage && chatMessages) {
    sendMessage.addEventListener('click', sendMessageHandler);
    userMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessageHandler();
    });
  }
  
  function toggleChat() {
    if (chatBox.style.display === 'block') {
      chatBox.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => {
        chatBox.style.display = 'none';
      }, 300);
    } else {
      chatBox.style.display = 'block';
      chatBox.style.animation = 'fadeIn 0.3s forwards';
    }
  }
  
  function sendMessageHandler() {
    const message = userMessage.value.trim();
    if (message) {
      // Add user message
      addMessage(message, 'user');
      
      // Clear input
      userMessage.value = '';
      
      // Show typing indicator
      showTypingIndicator();
      
      // Simulate bot reply after delay
      setTimeout(() => {
        removeTypingIndicator();
        addMessage("Thanks for your message! We'll get back to you soon.", 'bot');
      }, 1500);
    }
  }
  
  function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}-message`;
    messageElement.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.innerHTML = '<p>Typing...</p>';
    typingElement.id = 'typing-indicator';
    chatMessages.appendChild(typingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  }
}

// ===== Mobile Navigation =====
function setupMobileNavigation() {
  const navContainer = document.querySelector('.nav-container');
  if (!navContainer) return;
  
  // Create mobile toggle button
  const toggleButton = document.createElement('button');
  toggleButton.className = 'mobile-toggle';
  toggleButton.innerHTML = '<i class="fas fa-bars"></i> Menu';
  navContainer.parentNode.insertBefore(toggleButton, navContainer);
  
  // Toggle navigation on button click
  toggleButton.addEventListener('click', () => {
    navContainer.classList.toggle('mobile-hidden');
  });
  
  // Close mobile menu when clicking on a link
  navContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navContainer.classList.add('mobile-hidden');
      }
    });
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navContainer.classList.remove('mobile-hidden');
    }
  });
}

// ===== Smooth Scrolling =====
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
}

// ===== Active Nav Link Highlighting =====
function setupActiveNavHighlight() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-container a');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 100) {
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
}

// ===== Course Card Animation =====
function setupCourseCardAnimations() {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// ===== Form Submission =====
function setupFormSubmission() {
  const chatForm = document.getElementById('chatForm');
  const formMessage = document.getElementById('formMessage');
  
  if (chatForm && formMessage) {
    // Submit chat messages to FormSubmit
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // You would typically send the form data to a server here
      // For demonstration, we'll just log it
      console.log('Form submitted with message:', formMessage.value);
      
      // Show thank you message or redirect
      window.location.href = 'thank-you.html';
    });
  }
}

// ===== Utility Functions =====
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== Window Load Event =====
window.addEventListener('load', function() {
  // Any post-load functionality can go here
});
