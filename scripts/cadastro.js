(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button1').click();
  });
})();

function collectInputDataAndPost() {
  let inputData = {};
  let inputs = document.querySelectorAll('#quadrante1tela2inps input');

  for (let i = 0; i < inputs.length; i++) {
    inputData[inputs[i].id] = inputs[i].value;
  }

  let type = document.querySelector('input#type').value;
  let optionsInputs = document.querySelectorAll(`#${type === 'profissional' ? 'options1' : 'options2'} input`);
  let path = type === 'profissional' ? '/profissional' : '/cliente';

  for (let i = 0; i < optionsInputs.length; i++) {
    inputData[optionsInputs[i].id] = optionsInputs[i].value;
  }

  fetch(`http://localhost:8080${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}

function showOptions(optionsId, button, type) {
  document.querySelector('#type').value = type;

  let options = document.querySelectorAll('.options');
  options.forEach(function (option) {
    option.style.display = 'none';
  });

  let selectedOptions = document.getElementById(optionsId);
  selectedOptions.style.display = 'block';


  let buttons = document.querySelectorAll('.container button');
  buttons.forEach(function (btn) {
    btn.classList.remove('selected');
  });

  button.classList.add('selected');
}

