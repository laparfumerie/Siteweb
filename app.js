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
            e.preventDefault(); // Empêche la page de se recharger brutalement
            
            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Appel Supabase pour l'inscription avec les prénoms et noms
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: firstname,
                        last_name: lastname
                    }
                }
            });

            if (error) {
                alert("Erreur lors de l'inscription : " + error.message);
            } else {
                alert("Inscription réussie ! 🎉 Tu peux maintenant te connecter.");
            }
        });
    }

    // 🔐 Gestion de la connexion
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Empêche la page de se recharger brutalement
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Appel Supabase pour la connexion
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert("Erreur de connexion : " + error.message);
            } else {
                alert("Connexion réussie ! 🔓");
                // Redirection immédiate vers la page d'accueil
                window.location.href = "index.html"; 
            }
        });
    }
});
