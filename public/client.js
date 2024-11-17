const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        // Send message to server
        socket.emit('chat message', input.value);
        
        // Create sent message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.textContent = input.value;
        messages.appendChild(messageDiv);
        
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
});

socket.on('chat message', (msg) => {
    // Only create received message element if it's not our own message
    if (!messages.lastElementChild || messages.lastElementChild.textContent !== msg) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message received';
        messageDiv.textContent = msg;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
});