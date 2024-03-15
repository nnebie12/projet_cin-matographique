import { User } from './model.js';
import bcrypt from 'bcryptjs';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form_control');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('mail').value;
        const motDePasse = document.getElementById('mot_de_passe').value;
        const ville = document.getElementById('ville').value;
        const pays = document.getElementById('pays').value;
        
        const hashedPassword = require('hashedPassword'); 
        hashedPassword.genSalt(10, function(err, salt) {
            hashedPassword.hash("mon mot de passe", salt, function(err, hash) {
            });
        });
        hashedPassword.compare("un autre mot de passe", hash, function(err, res) {
        });
        const user = new User(nom, prenom, email, hashedPassword, ville, pays); 
        
        sendData(user);
    });
});

function sendData(user) {
    fetch('URL_DU_SERVEUR', {
        method: 'POST',
        body: new URLSearchParams(user),
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