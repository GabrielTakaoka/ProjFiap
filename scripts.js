function showOptions(optionsId, button) {

    var options = document.querySelectorAll('.options');
    options.forEach(function(option) {
        option.style.display = 'none';
    });
    

    var selectedOptions = document.getElementById(optionsId);
    selectedOptions.style.display = 'block';
    

    var buttons = document.querySelectorAll('.container button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
    });
    

    button.classList.add('selected');
}
function openNotification() {
    document.getElementById('notification-popup').style.display = 'block';
}
function closeNotification() {
    document.getElementById('notification-popup').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', (event) => {
    const supportButton = document.getElementById('supportButton');
    const supportDialog = document.getElementById('supportDialog');
    const closeButton = document.querySelector('.fechar-button');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.querySelector('.chat-container');

    supportButton.addEventListener('click', () => {
        supportDialog.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        supportDialog.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === supportDialog) {
            supportDialog.style.display = 'none';
        }
    });

    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'from-user');
            userMessage.innerHTML = `<p>${message}</p>`;
            chatContainer.appendChild(userMessage);
            userInput.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });
});
function changeProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}