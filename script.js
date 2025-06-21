// ===== STICKY NAVIGATION HIGHLIGHT =====
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
// ===== COOKIE CONSENT =====
document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Cookie elements
  const cookiePopup = document.getElementById('cookie-consent-popup');
  const acceptBtn = document.getElementById('cookie-consent-accept');
  const rejectBtn = document.getElementById('cookie-consent-reject');

  // Check existing consent
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) return cookieValue;
    }
    return null;
  };

  // Show popup if no consent
  if (!getCookie('cookie_consent')) {
    cookiePopup.style.display = 'block';
  }

  // Handle consent
  const setConsent = (value) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = `cookie_consent=${value}; expires=${date.toUTCString()}; path=/`;
    cookiePopup.style.display = 'none';
    
    // Update gtag consent
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'update', {
      'ad_storage': value === 'accepted' ? 'granted' : 'denied',
      'analytics_storage': value === 'accepted' ? 'granted' : 'denied'
    });
  };

  // Event listeners
  acceptBtn.addEventListener('click', () => setConsent('accepted'));
  rejectBtn.addEventListener('click', () => setConsent('rejected'));

  // ===== IMAGE OVERFLOW PROTECTION =====
  document.querySelectorAll('img').forEach(img => {
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  });
});
// ===== CHAT WIDGET FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  // Chat elements
  const chatButton = document.getElementById('chatButton');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const sendMessageBtn = document.getElementById('sendMessage');
  const userMessageInput = document.getElementById('userMessage');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const formMessageInput = document.getElementById('formMessage');

  // Toggle chat visibility
  const toggleChat = () => {
    chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
    chatButton.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
    if (chatBox.style.display === 'flex') {
      userMessageInput.focus();
    }
  };

  // Add message to chat
  const addMessage = (content, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = `<p>${content}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Event listeners
  if (chatButton && chatBox) {
    chatButton.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Send message
    const sendMessage = () => {
      const message = userMessageInput.value.trim();
      if (message) {
        addMessage(message, 'user');
        formMessageInput.value = message;
        chatForm.submit();
        userMessageInput.value = '';
        
        // Simulate bot reply (replace with actual API call)
        setTimeout(() => {
          addMessage("Thank you for your message! We'll get back to you soon.", 'bot');
        }, 1000);
      }
    };

    sendMessageBtn.addEventListener('click', sendMessage);
    userMessageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});
