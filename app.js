// Configuration de Supabase
const SUPABASE_URL = "https://ybbpeowdmtjdmrbbnqsg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYnBlb3dkbXRqZG1yYmJucXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MTgwMzAsImV4cCI6MjA5NzE5NDAzMH0.fbWceQVHXiK6kxz3fRTqn6TP8_m0weFGu27-COU00Ts";

// ============================================================
//  APP.JS — La Parfumerie
//  Initialisation Supabase + Auth (inscription / connexion)
// ============================================================

// ── Initialisation Supabase ─────────────────────────────────
// On utilise le namespace complet pour éviter les conflits
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Utilitaires ─────────────────────────────────────────────

/** Affiche un message de succès ou d'erreur dans la carte */
function showMsg(type, text) {
  const el = document.getElementById('msg');
  if (!el) return;
  el.className = `msg ${type}`;
  el.textContent = text;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/** Met le bouton en état de chargement */
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Chargement…';
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.label || btn.textContent;
  }
}

/** Valide un email basique */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Attente du chargement de la page ────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── REDIRECTION SI DÉJÀ CONNECTÉ ──────────────────────────
  // Sur les pages connexion/inscription, si l'utilisateur est
  // déjà authentifié, on le redirige vers le dashboard.
  const publicPages = ['connexion.html', 'inscription.html'];
  const currentPage = window.location.pathname.split('/').pop();

  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session && publicPages.includes(currentPage)) {
      window.location.href = 'dashboard.html';
    }
    if (!session && currentPage === 'dashboard.html') {
      window.location.href = 'connexion.html';
    }
  });

  // ──────────────────────────────────────────────────────────
  //  INSCRIPTION
  // ──────────────────────────────────────────────────────────
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.dataset.label = "Créer mon compte";

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstname = document.getElementById('firstname').value.trim();
      const lastname  = document.getElementById('lastname').value.trim();
      const email     = document.getElementById('email').value.trim();
      const password  = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      // ── Validation côté client ─────────────────────────
      if (!firstname || !lastname) {
        return showMsg('error', 'Merci de renseigner ton prénom et ton nom.');
      }
      if (!isValidEmail(email)) {
        return showMsg('error', 'Adresse e-mail invalide.');
      }
      if (password.length < 8) {
        return showMsg('error', 'Le mot de passe doit contenir au moins 8 caractères.');
      }
      if (password !== passwordConfirm) {
        return showMsg('error', 'Les deux mots de passe ne correspondent pas.');
      }

      setLoading('submit-btn', true);

      // ── Appel Supabase ─────────────────────────────────
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstname,
            last_name:  lastname,
            full_name:  `${firstname} ${lastname}`,
          }
        }
      });

      setLoading('submit-btn', false);

      if (error) {
        // Traduit les erreurs Supabase les plus fréquentes
        let msg = error.message;
        if (msg.includes('already registered')) {
          msg = 'Cette adresse e-mail est déjà utilisée.';
        } else if (msg.includes('Password')) {
          msg = 'Le mot de passe doit contenir au moins 8 caractères.';
        }
        return showMsg('error', msg);
      }

      // Supabase envoie un e-mail de confirmation par défaut
      showMsg('success', '🎉 Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse.');
      registerForm.reset();
    });
  }

  // ──────────────────────────────────────────────────────────
  //  CONNEXION
  // ──────────────────────────────────────────────────────────
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.dataset.label = "Se connecter";

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email    = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      // ── Validation côté client ─────────────────────────
      if (!isValidEmail(email)) {
        return showMsg('error', 'Adresse e-mail invalide.');
      }
      if (!password) {
        return showMsg('error', 'Merci de saisir ton mot de passe.');
      }

      setLoading('submit-btn', true);

      // ── Appel Supabase ─────────────────────────────────
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      setLoading('submit-btn', false);

      if (error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) {
          msg = 'E-mail ou mot de passe incorrect.';
        } else if (msg.includes('Email not confirmed')) {
          msg = 'Confirme d\'abord ton adresse e-mail (vérifie tes spams).';
        }
        return showMsg('error', msg);
      }

      // Connexion réussie → dashboard
      showMsg('success', '✅ Connexion réussie ! Redirection…');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    });
  }

  // ──────────────────────────────────────────────────────────
  //  DÉCONNEXION (bouton avec id="logout-btn" sur n'importe quelle page)
  // ──────────────────────────────────────────────────────────
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });
  }

});
