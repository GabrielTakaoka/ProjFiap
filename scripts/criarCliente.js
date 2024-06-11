function createCliente(clienteRecordDto, jwtToken) {
  const url = 'http://localhost:8080/cliente'; // replace with your actual API endpoint

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify(clienteRecordDto)
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
const clienteRecordDto = {
  email: 'example@example.com',
  senha: 'password123',
  nome: 'John Doe',
  contato: '1234567890',
  cep: '12345-678',
  logradouro: 'Rua Exemplo',
  bairro: 'Bairro Exemplo',
  cidade: 'Cidade Exemplo',
  uf: 'SP',
  userId: 1
};

const jwtToken = 'your-jwt-token-here';

createCliente(clienteRecordDto, jwtToken);
