document.addEventListener('DOMContentLoaded', function() {
  const authBtn = document.getElementById('auth-btn');
  function updateAuthBtn() {
    if (localStorage.getItem('login') === 'true') {
      authBtn.textContent = 'Logout';
      authBtn.onclick = function() {
        localStorage.removeItem('login');
        location.reload();
      };
    } else {
      authBtn.textContent = 'Login';
      authBtn.onclick = function() {
        window.location.href = 'login.html';
      };
    }
  }
  updateAuthBtn();
}); 