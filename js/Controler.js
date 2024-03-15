import { User } from './model.js';


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.form_control');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('mail').value;
        const motDePasse = document.getElementById('mot_de_passe').value;
        const ville = document.getElementById('ville').value;
        const pays = document.getElementById('pays').value;
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(motDePasse, salt, function(err, hash) {
                if (err) {
                    console.error('Erreur lors du hachage du mot de passe:', err);
                    return;
                }
                const user = new User(nom, prenom, email, hash, ville, pays); 
                
                sendData(user);
            });
        });
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