function showOptions(optionsId, button) {
    // Esconde todas as opções
    var options = document.querySelectorAll('.options');
    options.forEach(function(option) {
        option.style.display = 'none';
    });
    
    // Mostra as opções correspondentes ao botão clicado
    var selectedOptions = document.getElementById(optionsId);
    selectedOptions.style.display = 'block';
    
    // Remove a classe 'selected' de todos os botões
    var buttons = document.querySelectorAll('.container button');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
    });
    
    // Adiciona a classe 'selected' ao botão clicado
    button.classList.add('selected');
}