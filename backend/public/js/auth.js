document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginForm = document.getElementById('login');
  const registerForm = document.getElementById('register');
  const loginFormContainer = document.getElementById('login-form');
  const registerFormContainer = document.getElementById('register-form');
  const showLoginBtn = document.getElementById('show-login');
  const showRegisterBtn = document.getElementById('show-register');
  const userDashboard = document.getElementById('user-dashboard');
  const authForms = document.getElementById('auth-forms');
  const logoutBtn = document.getElementById('logout-btn');
  const welcomeMessage = document.getElementById('welcome-message');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const profileUsername = document.getElementById('profile-username');
  const profileEmail = document.getElementById('profile-email');
  const profileCreated = document.getElementById('profile-created');
  
  // Form fields for validation
  const registerUsername = document.getElementById('register-username');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  const registerConfirmPassword = document.getElementById('register-confirm-password');
  const passwordStrength = document.querySelector('.password-strength');
  
  // API URLs
  const API_URL = '/api/auth';
  
  // Check if user is already logged in
  checkAuthStatus();
  
  // Event Listeners
  showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms('login');
  });
  
  showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms('register');
  });
  
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  logoutBtn.addEventListener('click', handleLogout);
  
  // Password strength meter
  registerPassword.addEventListener('input', updatePasswordStrength);
  
  // Form validation
  registerUsername.addEventListener('blur', validateUsername);
  registerEmail.addEventListener('blur', validateEmail);
  registerPassword.addEventListener('blur', validatePassword);
  registerConfirmPassword.addEventListener('blur', validateConfirmPassword);
  
  // Functions
  function toggleForms(form) {
    if (form === 'login') {
      loginFormContainer.classList.remove('hidden');
      registerFormContainer.classList.add('hidden');
    } else {
      loginFormContainer.classList.add('hidden');
      registerFormContainer.classList.remove('hidden');
    }
  }
  
  async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast('Login successful!', 'success');
        setTimeout(() => {
          checkAuthStatus();
        }, 1000);
      } else {
        showToast(data.message || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Server error. Please try again.', 'error');
    }
  }
  
  async function handleRegister(e) {
    e.preventDefault();
    
    // Get form values
    const username = registerUsername.value.trim();
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;
    
    // Validate form
    if (!validateRegistrationForm()) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast('Registration successful!', 'success');
        setTimeout(() => {
          checkAuthStatus();
        }, 1000);
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Server error. Please try again.', 'error');
    }
  }
  
  async function handleLogout() {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        showToast('Logout successful!', 'success');
        setTimeout(() => {
          showAuthForms();
        }, 1000);
      } else {
        const data = await response.json();
        showToast(data.message || 'Logout failed', 'error');
      }
    } catch (error) {
      console.error('Logout error:', error);
      showToast('Server error. Please try again.', 'error');
    }
  }
  
  async function checkAuthStatus() {
    try {
      const response = await fetch(`${API_URL}/me`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        showDashboard(data.user);
      } else {
        showAuthForms();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      showAuthForms();
    }
  }
  
  function showDashboard(user) {
    // Update UI elements
    welcomeMessage.textContent = `Welcome, ${user.username}!`;
    logoutBtn.classList.remove('hidden');
    authForms.classList.add('hidden');
    userDashboard.classList.remove('hidden');
    
    // Update profile info
    profileUsername.textContent = user.username;
    profileEmail.textContent = user.email;
    
    // Format date
    const createdDate = new Date(user.created_at);
    profileCreated.textContent = createdDate.toLocaleDateString();
  }
  
  function showAuthForms() {
    welcomeMessage.textContent = '';
    logoutBtn.classList.add('hidden');
    authForms.classList.remove('hidden');
    userDashboard.classList.add('hidden');
    loginFormContainer.classList.remove('hidden');
    registerFormContainer.classList.add('hidden');
    
    // Clear forms
    loginForm.reset();
    registerForm.reset();
  }
  
  function showToast(message, type = '') {
    toastMessage.textContent = message;
    toast.className = 'toast visible';
    
    if (type) {
      toast.classList.add(type);
    }
    
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }
  
  // Form validation functions
  function validateUsername() {
    const value = registerUsername.value.trim();
    const errorElement = registerUsername.nextElementSibling;
    
    if (value.length < 3) {
      errorElement.textContent = 'Username must be at least 3 characters';
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }
  
  function validateEmail() {
    const value = registerEmail.value.trim();
    const errorElement = registerEmail.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      errorElement.textContent = 'Please enter a valid email address';
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }
  
  function validatePassword() {
    const value = registerPassword.value;
    const errorElement = registerPassword.nextElementSibling.nextElementSibling;
    
    if (value.length < 6) {
      errorElement.textContent = 'Password must be at least 6 characters';
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }
  
  function validateConfirmPassword() {
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;
    const errorElement = registerConfirmPassword.nextElementSibling;
    
    if (confirmPassword !== password) {
      errorElement.textContent = 'Passwords do not match';
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }
  
  function validateRegistrationForm() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  }
  
  function updatePasswordStrength() {
    const password = registerPassword.value;
    
    if (password.length === 0) {
      passwordStrength.className = 'password-strength';
      return;
    }
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) {
      strength += 1;
    }
    
    // Uppercase, lowercase check
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 1;
    }
    
    // Number check
    if (/\d/.test(password)) {
      strength += 1;
    }
    
    // Special character check
    if (/[^a-zA-Z0-9]/.test(password)) {
      strength += 1;
    }
    
    // Update UI
    passwordStrength.className = 'password-strength';
    if (strength === 1) {
      passwordStrength.classList.add('weak');
    } else if (strength === 2 || strength === 3) {
      passwordStrength.classList.add('medium');
    } else if (strength >= 4) {
      passwordStrength.classList.add('strong');
    }
  }
});