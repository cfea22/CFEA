document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navbar = document.querySelector('.nav-container');
      navbar.classList.remove('active');
    });
  });
  
  // Mobile menu toggle
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('nav').prepend(mobileMenuToggle);
  
  mobileMenuToggle.addEventListener('click', function() {
    document.querySelector('.nav-container').classList.toggle('active');
  });
  
  // Add animation to elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.course-card, .feature-card, .announcement-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animation
  const animatedElements = document.querySelectorAll('.course-card, .feature-card, .announcement-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Form submission handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
});
// Chat Widget
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('chatButton');
  const chatBox = document.getElementById('chatBox');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const userMessageInput = document.getElementById('userMessage');
  const sendMessageButton = document.getElementById('sendMessage');
  const chatForm = document.getElementById('chatForm');
  const formMessage = document.getElementById('formMessage');

  // Toggle chat box
  chatButton.addEventListener('click', function() {
    chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
  });

  closeChat.addEventListener('click', function() {
    chatBox.style.display = 'none';
  });

  // Send message
  function sendMessage() {
    const message = userMessageInput.value.trim();
    if (message) {
      addMessage(message, 'user-message');
      userMessageInput.value = '';
      
      // Save message to form and submit
      formMessage.value = message;
      chatForm.submit();
      
      // Show confirmation
      setTimeout(() => {
        addMessage("Thank you! Your message has been sent. We'll respond soon.", 'bot-message');
      }, 1000);
    }
  }

  // Send on button click or Enter key
  sendMessageButton.addEventListener('click', sendMessage);
  userMessageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });

  // Add message to chat UI
  function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', className);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
