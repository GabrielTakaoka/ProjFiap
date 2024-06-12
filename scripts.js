
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
        reader.onload = function (e) {
            document.getElementById('profile-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const monthLabel = document.querySelector('.month h2');
    const daysContainer = document.querySelector('.days');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    function updateCalendar() {
        monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        daysContainer.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div class="day empty"></div>';
        }

        for (let i = 1; i <= lastDate; i++) {
            let dayClass = 'day';
            if (i === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
                dayClass += ' today';
            }
            daysContainer.innerHTML += `<div class="${dayClass}">${i}</div>`;
        }
    }

    prevButton.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextButton.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    updateCalendar();
});
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');
    const columns = document.querySelectorAll('.column');

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-enter');
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-enter');
    }

    function drop(e) {
        e.target.classList.remove('drag-enter');

        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        e.target.appendChild(draggable);

        // Atualiza a cor do item com base na coluna onde foi solto
        if (e.target.id === 'awaiting' || e.target.closest('#awaiting')) {
            draggable.style.backgroundColor = '#ffcccc'; // Red
        } else if (e.target.id === 'in-progress' || e.target.closest('#in-progress')) {
            draggable.style.backgroundColor = '#fff0b3'; // Yellow
        } else if (e.target.id === 'completed' || e.target.closest('#completed')) {
            draggable.style.backgroundColor = '#ccffcc'; // Green
        }
    }
});
const profileMessages = {
    profile1: [],
    profile2: []
    // Adicione mais perfis conforme necessário
};

let currentProfile = '';

function openMessenger(profileName, initialMessage, profileKey) {
    currentProfile = profileKey;
    var messenger = document.getElementById('messenger');
    var profileNameElement = document.getElementById('profileName');
    var messages = document.getElementById('messages');

    profileNameElement.textContent = profileName;

    // Carregar mensagens do perfil selecionado
    messages.innerHTML = profileMessages[profileKey].map(message =>
        '<p class="message ' + message.type + '">' + message.text + '</p>'
    ).join('');

    // Adicionar a mensagem inicial, se for a primeira vez
    if (profileMessages[profileKey].length === 0) {
        profileMessages[profileKey].push({ text: initialMessage, type: 'received' });
        messages.innerHTML += '<p class="message received">' + initialMessage + '</p>';
    }

    messenger.classList.remove('hidden');
    document.getElementById('messageInput').focus(); // Coloca o foco no campo de entrada
}

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var messages = document.getElementById('messages');

    if (messageInput.value.trim() !== "") {
        var newMessage = { text: messageInput.value, type: 'sent' };
        profileMessages[currentProfile].push(newMessage);
        messages.innerHTML += '<p class="message sent">' + newMessage.text + '</p>';
        messageInput.value = "";
        messages.scrollTop = messages.scrollHeight;
        document.getElementById('messageInput').focus(); // Coloca o foco de volta no campo de entrada após o envio
    }
}

// Adicionar evento de tecla pressionada para enviar mensagem com Enter
document.getElementById('messageInput').addEventListener('keyup', function (e) {
    if (e.key === 'Enter' && e.which === 13) {
        e.preventDefault(); // Evita o comportamento padrão de inserir uma nova linha ao pressionar Enter
        document.getElementById('sendMessageBtn').click(); // Simula o clique no botão de envio
    }
});

document.getElementById('filter-button').addEventListener('click', function () {
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer.style.display === 'block') {
        filterContainer.style.display = 'none';
    } else {
        filterContainer.style.display = 'block';
    }
});

function showProfileDetails(profileId) {
    const profileDetailsOverlay = document.getElementById('profile-details-overlay');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profilePhone = document.getElementById('profile-phone');
    const profileAddress = document.getElementById('profile-address');

    switch (profileId) {
        case 'profile1':
            profileName.innerText = 'João Silva';
            profileEmail.innerText = 'Email: joao@example.com';
            profilePhone.innerText = 'Celular: (11) 91234-5678';
            profileAddress.innerText = 'Endereço: Rua Exemplo, 123, São Paulo, SP';
            break;
        case 'profile2':
            profileName.innerText = 'Maria Oliveira';
            profileEmail.innerText = 'Email: maria@example.com';
            profilePhone.innerText = 'Celular: (21) 98765-4321';
            profileAddress.innerText = 'Endereço: Av. Exemplo, 456, Rio de Janeiro, RJ';
            break;
        case 'profile3':
            profileName.innerText = 'Pedro Santos';
            profileEmail.innerText = 'Email: pedro@example.com';
            profilePhone.innerText = 'Celular: (31) 91234-5678';
            profileAddress.innerText = 'Endereço: Rua Outra, 789, Belo Horizonte, MG';
            break;
        case 'profile4':
            profileName.innerText = 'Ana Costa';
            profileEmail.innerText = 'Email: ana@example.com';
            profilePhone.innerText = 'Celular: (41) 91234-5678';
            profileAddress.innerText = 'Endereço: Rua Qualquer, 321, Curitiba, PR';
            break;
        case 'profile5':
            profileName.innerText = 'Carlos Lima';
            profileEmail.innerText = 'Email: carlos@example.com';
            profilePhone.innerText = 'Celular: (51) 91234-5678';
            profileAddress.innerText = 'Endereço: Av. Importante, 654, Porto Alegre, RS';
            break;
    }

    profileDetailsOverlay.style.display = 'flex';
}

function closeProfileDetails() {
    document.getElementById('profile-details-overlay').style.display = 'none';
}

document.getElementById('apply-filters').addEventListener('click', function () {
    const serviceType = document.getElementById('service-type').value;
    const distance = document.getElementById('distance').value;
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;

    // Aqui você pode adicionar a lógica de filtro conforme necessário

    alert(`Filtros aplicados:\nTipo de Serviço: ${serviceType}\nDistância: ${distance}\nPreço Mínimo: ${priceMin}\nPreço Máximo: ${priceMax}`);
});
