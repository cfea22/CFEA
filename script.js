// Chat widget toggle
document.getElementById('chatButton').addEventListener('click', () => {
  const box = document.getElementById('chatBox');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('closeChat').addEventListener('click', () => {
  document.getElementById('chatBox').style.display = 'none';
});

// Simulated chat behavior (e.g., form submission via FormSubmit)
document.getElementById('sendMessage').addEventListener('click', () => {
  const msgInput = document.getElementById('userMessage');
  const text = msgInput.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById('chatMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user-message';
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  // Send to hidden FormSubmit form
  document.getElementById('formMessage').value = text;
  document.getElementById('chatForm').submit();

  // Clear input & simulate bot reply
  msgInput.value = '';
  setTimeout(() => {
    const botReply = document.createElement('div');
    botReply.className = 'chat-message bot-message';
    botReply.textContent = 'Thank you! We will get back to you soon.';
    chatMessages.appendChild(botReply);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
});
