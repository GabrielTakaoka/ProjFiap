function createProfissional(profissionalRecordDto, jwtToken) {
  const url = 'http://localhost:8080/profissional'; // replace with your actual API endpoint

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify(profissionalRecordDto)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Usage
const profissionalRecordDto = {
  nome: 'John Doe',
  contato: '1234567890',
  cep: '12345-678',
  logradouro: 'Rua Exemplo',
  bairro: 'Bairro Exemplo',
  cidade: 'Cidade Exemplo',
  uf: 'SP',
  tipoProfissionalId: 1,
  userId: 1
};

const jwtToken = 'your-jwt-token-here';

createProfissional(profissionalRecordDto, jwtToken);
