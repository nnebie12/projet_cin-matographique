require('dotenv').config();
const Swal = require('sweetalert2');
const { verifyPassword } = require('../Model/verifyPasswords');

const user = {
    username: 'diane',
    password: 'azerty',
    hashedPassword: '', 
    token: process.env.TOKEN 
};

const verifyCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (username === user.username) {
                const passwordMatch = await verifyPassword(password, user.hashedPassword);
                if (passwordMatch) {
                    resolve(user.token);
                } else {
                    reject('Mot de passe incorrect');
                }
            } else {
                reject('Nom d\'utilisateur incorrect');
            }
        }, 1000);
    });
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const username = document.getElementById('votre login ou mail').value;
    const password = document.getElementById('mot de passe').value;

    verifyCredentials(username, password)
        .then((token) => {
            Swal.fire(
                'Vous êtes connectés',
                'Validez sur le bouton',
                'success'
            );
            localStorage.setItem("user", user.token);
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erreur de connexion',
                footer: '<a href="">Why do I have this issue?</a>'
            });
            console.log('Erreur :', error);
        });
};

module.exports = { handleFormSubmit };