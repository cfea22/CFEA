// Smooth Scroll
document.querySelectorAll('.nav-container a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Chat Widget
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const sendButton = document.getElementById('sendMessage');
const userMessageInput = document.getElementById('userMessage');
const chatMessages = document.getElementById('chatMessages');

chatButton?.addEventListener('click', () => {
  chatBox.style.display = 'block';
});
closeChat?.addEventListener('click', () => {
  chatBox.style.display = 'none';
});

sendButton?.addEventListener('click', () => {
  const userMessage = userMessageInput.value.trim();
  if (userMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'user-message');
    messageDiv.innerHTML = `<p>${userMessage}</p>`;
    chatMessages.appendChild(messageDiv);
    userMessageInput.value = '';
    // You can expand this to call the backend or show a bot reply
  }
});
