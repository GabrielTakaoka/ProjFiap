(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const data = {
        login: loginForm.email.value,
        password: loginForm.password.value
      };

      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(({ token }) => {
          localStorage.setItem('token', token)
          location.href = "/perfil.html"
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });

})();

