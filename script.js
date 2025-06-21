// ===== Cookie Consent =====
const cookiePopup = document.getElementById('cookie-consent-popup');
const cookieAccept = document.getElementById('cookie-consent-accept');
const cookieReject = document.getElementById('cookie-consent-reject');

// Check if user has already made a choice
if (!localStorage.getItem('cookieConsent')) {
  setTimeout(() => {
    cookiePopup.style.display = 'block';
  }, 2000);
}

// Handle accept button
cookieAccept.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookiePopup.style.display = 'none';
  // Enable analytics cookies here if needed
});

// Handle reject button
cookieReject.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'rejected');
  cookiePopup.style.display = 'none';
});

// ===== Chat Widget =====
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const userMessage = document.getElementById('userMessage');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat box
chatButton.addEventListener('click', () => {
  chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
});

closeChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
});

// Send message function
function sendMessageHandler() {
  const message = userMessage.value.trim();
  if (message) {
    // Add user message
    const userMsgElement = document.createElement('div');
    userMsgElement.className = 'chat-message user-message';
    userMsgElement.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(userMsgElement);
    
    // Clear input
    userMessage.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot reply after 1 second
    setTimeout(() => {
      const botMsgElement = document.createElement('div');
      botMsgElement.className = 'chat-message bot-message';
      botMsgElement.innerHTML = '<p>Thanks for your message! We\'ll get back to you soon.</p>';
      chatMessages.appendChild(botMsgElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
}

// Send message on button click or Enter key
sendMessage.addEventListener('click', sendMessageHandler);
userMessage.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessageHandler();
});

// ===== Form Submission =====
const chatForm = document.getElementById('chatForm');
const formMessage = document.getElementById('formMessage');

// Submit chat messages to FormSubmit
chatMessages.addEventListener('DOMNodeInserted', (e) => {
  if (e.target.className.includes('user-message')) {
    formMessage.value = e.target.textContent.trim();
    chatForm.submit();
  }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-container a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 100) {
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
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// ===== Mobile Menu Toggle (if needed) =====
// Add this if you implement a mobile menu later
