const url1 = "http://localhost:5678/api/works"
const travaux = document.querySelector(".gallery")
const filters = document.getElementById("filters")
const url2 = "http://localhost:5678/api/categories"


/* Je récupère les projets depuis l'API */

const getTravaux = () => {
    return fetch(url1)
    .then (function (res) {
        return res.json()
    })
    .catch(function (error) {
        console.log(error)
    })
}


/* Je récupère les filtres depuis l'API */

const getFilters = () => {
    return fetch(url2)
    .then(function (res){
        return res.json()
    }) 
    .catch(function (error) {
        console.log(error)
    })
}

/* Je vérifie si un token est stocké dans local storage, si c'est le cas j'affiche le mode édition, sinon je cache le mode édition */

function verificationToken() {
    const token = localStorage.getItem("token")

    if (token) {
        document.getElementById("banner").style.display = "flex"
        document.getElementById("login").innerHTML="logout"
        document.getElementById("editionLogin").style.display = "block"
        filters.style.display ="none"
        initModal()

    } else {
        document.getElementById("banner").style.display = "none"
        document.getElementById("login").innerHTML="login"
    }
}

/* Je filtre les travaux en fonction du filtre cliqué */

function filterWorks(works, selectedFilter) {
    return works.filter(work => work.categoryId === selectedFilter)
}

/* J'ajoute une classe "active" sur les filtres afin que l'effet reste même après avoir cliqué sur ces derniers */

const activeClassAll = (event) => {
    Array.from(event.target.parentNode.children).forEach(element => {
        element.classList.remove('active')
    })
    event.target.classList.add('active')
}

/* Je crée des boutons auxquels j'affecte les noms des filtres récupérés depuis l'API plus tôt et je trie les travaux */

const displayFilter = (filter, works) => {
    const buttonFilter = document.createElement("button")
    buttonFilter.textContent = filter.name
    buttonFilter.classList.add('buttonsFilter')
    buttonFilter.addEventListener("click", function(event) {
        const filteredWorks = filterWorks(works, filter.id)
        displayWorks(filteredWorks)
        console.log(event.target.parentNode.children)
        activeClassAll(event)
    })
    filters.appendChild(buttonFilter)
}

/* Je crée le bouton de filtres "Tous" et paramètre l'affichage de tous les projets puis rappelle les filtres pour les afficher  */

const initFilters = async function(works) {
    const all = document.createElement("button")
    all.textContent = "Tous"
    all.addEventListener("click", function(event) {
    displayWorks(works)
    activeClassAll(event)
    
})
    filters.appendChild(all)
    
    const displayFilters = await getFilters()
    console.log(displayFilters)
    displayFilters.forEach(filter => {
        displayFilter(filter, works)
    })
}

/* Je crée les balises qui accueillent la galerie de projets et j'y insère les images et leur description qui ont été récupérés depuis l'API plus tôt */

const displayWork = (work) => {
    const baliseFigure = document.createElement("figure")
        
    const baliseImage = document.createElement("img")
    baliseImage.src = work.imageUrl
    baliseImage.alt = work.title

    const titleWork = document.createElement("figcaption")
    titleWork.textContent = work.title

    baliseFigure.appendChild(baliseImage)
    baliseFigure.appendChild(titleWork)
    console.log(travaux)
    travaux.appendChild(baliseFigure)
}

/* Je vide les projets existants puis itération afin d'update le contenu du tableau des projets */

const displayWorks = (works) => {
   travaux.innerHTML = ''
    works.forEach(work => {
        displayWork(work)
    })
}

/* Je rafraîchis la galerie de la page d'accueil */

const refreshHomePageGallery = async () => {
    
    worksModal.innerHTML = ''
  
    const travauxModal = await displayGalleryModal()
    travauxModal.forEach(gallery => {
      displayGallery(gallery)
    })
  }

/* Je récupère les projets et les affiche, j'appelle la fonction qui affiche les filtres ensuite, je vérifie la présence du token pour afficher le bon mode sur la page et je redirige l'utilisateur sur la page de login en vidant le local storage s'il clique sur "logout" */

const init = async function() {
    const works = await getTravaux()
    console.log(works)
    works.forEach(work => {
        displayWork(work)
    })
    
    initFilters(works)

    verificationToken()

    document.getElementById("login").addEventListener("click", function() {
        const token = localStorage.getItem("token")
        if (token) {
            localStorage.removeItem("token")
        }
        window.location.href = "login.html"
    })
}

init()


