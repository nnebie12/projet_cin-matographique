import { User } from '../Model/sing-up.js';


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form_control');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('mail').value;
        const motDePasse = document.getElementById('mot de passe').value;
        const ville = document.getElementById('ville').value;
        const pays = document.getElementById('pays').value;
        
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(motDePasse);

        const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', passwordBuffer);

        const hashedPasswordHex = Array.from(new Uint8Array(hashedPasswordBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        const user = new User(nom, prenom, email, hashedPasswordHex, ville, pays); 
                
        sendData(user);
    
    });
});

function sendData(user) {
    fetch('', {
        method: 'POST',
        body: JSON.stringify(user), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du formulaire');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}