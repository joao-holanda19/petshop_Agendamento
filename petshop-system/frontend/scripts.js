// Global variables
let currentUser = null;
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token && !document.getElementById('loginForm')) {
        currentUser = parseJwt(token);
        loadPets();
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Show password toggle
        const showPasswordBtn = document.querySelector('.show-password');
        if (showPasswordBtn) {
            showPasswordBtn.addEventListener('click', function() {
                const passwordInput = document.getElementById('password');
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.textContent = '🙈';
                } else {
                    passwordInput.type = 'password';
                    this.textContent = '👁️';
                }
            });
        }
    }
    
    // Registration form would be similar
    
    // Pet form
    const petForm = document.getElementById('petForm');
    if (petForm) {
        petForm.addEventListener('submit', handlePetSubmit);
        
        // Image preview
        const petImageInput = document.getElementById('petImage');
        if (petImageInput) {
            petImageInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const preview = document.getElementById('imagePreview');
                        preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    // Tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});

// Helper function to parse JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'agendamentos.html';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

// Handle pet submission
async function handlePetSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('pet_name', document.getElementById('petName').value);
    formData.append('breed', document.getElementById('breed').value);
    formData.append('appointment_date', document.getElementById('appointmentDate').value);
    formData.append('notes', document.getElementById('notes').value);
    formData.append('image', document.getElementById('petImage').files[0]);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pets`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Agendamento criado com sucesso!');
            document.getElementById('petForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            loadPets();
            document.querySelector('.tab[data-tab="list"]').click();
        } else {
            alert(data.error || 'Failed to create appointment');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

// Load pets
async function loadPets() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const pets = await response.json();
        const petsList = document.getElementById('petsList');
        
        if (response.ok) {
            if (pets.length === 0) {
                petsList.innerHTML = '<p>Nenhum agendamento encontrado.</p>';
                return;
            }
            
            petsList.innerHTML = pets.map(pet => `
                <div class="pet-card" data-id="${pet.id}">
                    <img src="/${pet.image_path}" alt="${pet.pet_name}" class="pet-image">
                    <div class="pet-info">
                        <h3>${pet.pet_name}</h3>
                        <p><strong>Raça:</strong> ${pet.breed}</p>
                        <p><strong>Data:</strong> ${new Date(pet.appointment_date).toLocaleString()}</p>
                        ${pet.notes ? `<p><strong>Observações:</strong> ${pet.notes}</p>` : ''}
                    </div>
                    <div class="pet-actions">
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Excluir</button>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', deletePet);
            });
            
            document.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', editPet);
            });
        } else {
            petsList.innerHTML = '<p>Erro ao carregar agendamentos.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('petsList').innerHTML = '<p>Erro ao carregar agendamentos.</p>';
    }
}

// Delete pet
async function deletePet(e) {
    const petId = e.target.closest('.pet-card').getAttribute('data-id');
    
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                loadPets();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete appointment');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    }
}

// Edit pet (similar to delete, but would populate the form)
async function editPet(e) {
    // Implementation would be similar to delete but would populate the form
    // with the pet data for editing
}