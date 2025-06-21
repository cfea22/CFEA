// Cookie Consent Popup
const cookiePopup = document.getElementById('cookie-consent-popup');
const acceptBtn = document.getElementById('cookie-consent-accept');
const rejectBtn = document.getElementById('cookie-consent-reject');

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(cname) == 0) return c.substring(cname.length, c.length);
  }
  return "";
}

function checkCookieConsent() {
  const consent = getCookie("cookieConsent");
  if (consent === "accepted" || consent === "rejected") {
    cookiePopup.style.display = "none";
  } else {
    cookiePopup.style.display = "block";
  }
}

acceptBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "accepted", 365);
  cookiePopup.style.display = "none";
  // You can enable analytics or ads here
});

rejectBtn.addEventListener("click", () => {
  setCookie("cookieConsent", "rejected", 365);
  cookiePopup.style.display = "none";
  // Disable analytics or ads here
});

checkCookieConsent();

// Chat widget functionality
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const sendMessageBtn = document.getElementById('sendMessage');
const userMessageInput = document.getElementById('userMessage');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const formMessageInput = document.getElementById('formMessage');

function appendMessage(content, sender = 'user') {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.innerHTML = `<p>${content}</p>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function clearInput() {
  userMessageInput.value = '';
  userMessageInput.focus();
}

chatButton.addEventListener('click', () => {
  chatBox.style.display = 'flex';
  chatBox.focus();
  chatButton.style.display = 'none';
});

closeChat.addEventListener('click', () => {
  chatBox.style.display = 'none';
  chatButton.style.display = 'flex';
});

sendMessageBtn.addEventListener('click', () => {
  const message = userMessageInput.value.trim();
  if (message) {
    appendMessage(message, 'user');
    formMessageInput.value = message; // set message in hidden form
    chatForm.submit();
    clearInput();
    // Optionally, show a bot reply
    setTimeout(() => {
      appendMessage("Thank you for your message! We'll get back to you shortly.", 'bot');
    }, 1000);
  }
});

// Also send message on Enter key
userMessageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessageBtn.click();
  }
});
