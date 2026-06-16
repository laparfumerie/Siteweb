// Attente du chargement complet de la page
document.addEventListener('DOMContentLoaded', () => {
    
    // 👥 Gestion de l'inscription
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche la page de se recharger
            
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log("Tentative d'inscription :", { firstname, lastname, email });
            // C'est ici que nous brancherons l'appel Supabase
        });
    }

    // 🔐 Gestion de la connexion
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche la page de se recharger
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log("Tentative de connexion :", { email });
            // C'est ici que nous brancherons l'appel Supabase
        });
    }
});
