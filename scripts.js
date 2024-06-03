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