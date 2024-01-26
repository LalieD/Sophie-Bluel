const url = "http://localhost:5678/api/users/login"

/* C'est une expression régulière me permettant de vérifier que la saisie d'un format email est bien respectée */

function validateEmail(email) {
    var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailReg.test(email)
}

/* Je fais un appel à l'API pour vérifier les valeurs de l'email et du mot de passe qui ont été entrés, si ces derniers sont valides, l'utilisateur est redirigé vers la page d'accueil version mode édition car le token est stocké */

async function login(emailValue, passwordValue) {
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:emailValue, password:passwordValue})
        })

        if(response.ok) {
            const responseData = await response.json()
        console.log(response)
        localStorage.setItem('token', responseData.token)
        window.location.href = "index.html"
        } else {
            document.getElementById('unauthorizedAccess').innerHTML="Accès non autorisé"
        }
    } catch(error) {
        document.getElementById('unauthorizedAccess').innerHTML="Accès non autorisé"
    }
}

/* J'ajoute un évènement submit sur mon formulaire de connexion afin de vérifier les valeurs exactes qui ont été entrées et de les comparer avec les valeurs présentes dans l'API  */

const init = () => {
    const formulaire = document.getElementById("formulaire")
    console.log(formulaire)
    
    formulaire.addEventListener("submit", function(event) {
        event.preventDefault()
        if(validateEmail(event.target.elements["email"].value)) {
            console.log("L'email est valide")
        } else {
            document.getElementById('invalidEmail').innerHTML="L'email est invalide"
        }
        
        if(event.target.elements["password"].value) {
            console.log("Le mot de passe est valide")
        } else {
            document.getElementById('invalidPassword').innerHTML="Le mot de passe est invalide"
        }

        if(validateEmail(event.target.elements["email"].value) && event.target.elements["password"].value) {
            login(event.target.elements["email"].value, event.target.elements["password"].value)
        }
    })
}

init ()