const url1 = "http://localhost:5678/api/works"
const travaux = document.querySelector(".gallery")
const filters = document.getElementById("filters")


const url2 = "http://localhost:5678/api/categories"


const getTravaux = () => {
    return fetch(url1)
    .then (function (res) {
        return res.json()
    })
    .catch(function (error) {
        console.log(error)
    })
}

const getFilters = () => {
    return fetch(url2)
    .then(function (res){
        return res.json()
    }) 
    .catch(function (error) {
        console.log(error)
    })
}


function verificationToken() {
    const token = localStorage.getItem("token")

    if (token) {
        document.getElementById("banner").style.display = "flex"
        document.getElementById("login").innerHTML="logout"
        document.getElementById("editionLogin").style.display = "block"
        /*let filtersHidden = document.getElementById("filters")
        filtersHidden.hidden = true*/

    } else {
        document.getElementById("banner").style.display = "none"
        document.getElementById("login").innerHTML="login"
    }
}

function filterWorks(works, selectedFilter) {
    return works.filter(work => work.categoryId === selectedFilter)
}


const displayFilter = (filter, works) => {
    const buttonFilter = document.createElement("button")
    buttonFilter.textContent = filter.name
    buttonFilter.classList.add('buttonsFilter')
    buttonFilter.addEventListener("click", function() {
        const filteredWorks = filterWorks(works, filter.id)
        displayWorks(filteredWorks)
    })
    filters.appendChild(buttonFilter)
}

const initFilters = async function(works) {
    const all = document.createElement("button")
    all.textContent = "Tous"
    all.addEventListener("click", function() {
    displayWorks(works)
    
})
    /*all.addEventListener("click", function() {
        all.classList.add("active")
    })*/

    filters.appendChild(all)
    
    const displayFilters = await getFilters()
    console.log(displayFilters)
    displayFilters.forEach(filter => {
        displayFilter(filter, works)
    })
}

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

const displayWorks = (works) => {
   travaux.innerHTML = ''
    works.forEach(work => {
        displayWork(work)
    })
}


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


