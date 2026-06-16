// Configuration de Supabase
const SUPABASE_URL = "https://ybbpeowdmtjdmrbbnqsg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYnBlb3dkbXRqZG1yYmJucXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MTgwMzAsImV4cCI6MjA5NzE5NDAzMH0.fbWceQVHXiK6kxz3fRTqn6TP8_m0weFGu27-COU00Ts";

// Initialisation du client Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
