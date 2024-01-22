const worksModal = document.querySelector(".galleryModal")


const displayGalleryModal = () => {
  return fetch(url1)
  .then (function (res) {
      return res.json()
  })
  .catch(function (error) {
      console.log(error)
  })
}


const displayGallery = async function(work) {
    const baliseFigure = document.createElement("figure")
    worksModal.appendChild(baliseFigure)
    
    const baliseImage = document.createElement("img")
    baliseImage.src = work.imageUrl
    baliseFigure.appendChild(baliseImage)
    
    const divButton = document.createElement("div")
    baliseFigure.appendChild(divButton)
    
    const buttonDelete = document.createElement('button')
    buttonDelete.innerHTML ='<i class="fa-solid fa-trash-can"></i>'
    divButton.appendChild(buttonDelete)

    /*Test gestionnaire d'évènements pour le bouton de suppression*/
    buttonDelete.addEventListener('click', async () => {
      if(confirm("Voulez-vous vraiment supprimer ce projet ?")) {
        await deleteWork(work.id)
        baliseFigure.remove()
      }
    })
}


/*Test fonction de suppression des projets*/
const deleteWork = async (projectId) => {
  const url = "http://localhost:5678/api/works/{id}"
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du projet')
    }

    console.log('Projet supprimé avec succès')
  } catch (error) {
    console.error('Erreur lors de la suppresion du projet', error.message)
  }
}


const displayCategoryModal = () => {
  return fetch(url2)
    .then(function (res){
        return res.json()
    }) 
    .then(data => {
      displayCategory(data)
    })
    .catch(function (error) {
        console.log(error)
    })
}


let modal = document.getElementById("modal1")
let firstPage = document.getElementById("modalFirstPage")
let secondPage = document.getElementById("modalSecondPage")

const openModal = function (e) {
  e.preventDefault()
  modal.style.display = "flex"
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.querySelector('.jsModalClose').addEventListener('click', closeModal)
  modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

const displayCategory = (data) => {
  let select = document.getElementById("selectCategory")
  select.innerHTML = ''
  const placeholderOption = document.createElement('option')
  placeholderOption.value = ''
  placeholderOption.textContent = 'Sélectionnez une catégorie'
  select.appendChild(placeholderOption)
  data.forEach(option => {
    const optionElement = document.createElement('option')
    optionElement.value = option.id
    optionElement.textContent = option.name
    select.appendChild(optionElement)
  })

}

const openAddProjetFormModal = function (e) {
  e.preventDefault()
  firstPage.style.display = "none"
  secondPage.style.display ="flex"
  displayCategoryModal()
}


const openGalleryModal = () => {
  secondPage.style.display = "none"
  firstPage.style.display = "flex"
}

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.jsModalClose').removeEventListener('click', closeModal)
  modal.querySelector('.jsModalStop').removeEventListener('click', stopPropagation)
}

const stopPropagation = function (e) {
  e.stopPropagation()
}


document.querySelectorAll('.jsModal').forEach(button => {
  button.addEventListener('click', openModal)
})

const validateForm = function (e) {
 e.preventDefault()
 /*Test fonction de validation du formulaire*/
 const titleInput = document.getElementById('titleInput')
 const fileInput = document.getElementById('fileInput')
 const selectCategory = document.getElementById('selectCategory')

 const errorTitle = document.getElementById('errorTitle')
 const errorFileInput = document.getElementById('errorFileInput')
 const errorSelectCategory = document.getElementById('errorSelectCategory')

 /*Réinitialisation des messages d'erreur*/
 errorTitle.textContent = ''
 errorFileInput.textContent = ''
 errorSelectCategory.textContent = ''
 
 if (titleInput.value.trim() === '') {
  errorTitle.textContent = 'Veuillez renseigner un titre'
 }
 
 if (!fileInput.files[0]) {
  errorFileInput.textContent = 'Veuillez insérer une image'
 }

 if (selectCategory.value === '') {
  errorSelectCategory.textContent = 'Veuillez sélectionner un titre'
 }
 
 /*Soumission du formulaire si tous les champs sont valides*/
 if (errorTitle.textContent === '' && errorFileInput.textContent === '' && errorSelectCategory.textContent === '') {
  console.log('Formulaire valide, tous les champs ont correctement été renseignés')
 }



 
 /* 
  la même chose pour les input text et category avec un .value
  e.fileInput.file ne doit pas être vide (le vérifier)
  le titre doit aussi avoir une valeur (pas de string vide)
  select doit avoir une valeur (id sélectionné) et pas celle de placeholder
  afficher un message d'erreur sous chaque input qui n'a pas la bonne valeur : dans le html balise p qui est en display none, la ou les placer en display block (3 if d'affilé sans else)
 */
}


const initModal = async function() {
  const travauxModal = await displayGalleryModal()
  console.log(travaux.Modal)
  travauxModal.forEach(gallery => {
    displayGallery(gallery)
  })
  displayGalleryModal()
  modal.querySelector('.addPhoto').addEventListener('click', openAddProjetFormModal)
  modal.querySelector('.jsModalReturn').addEventListener('click', openGalleryModal)
  /* Récupérer le formulaire via l'id, ajouter un event de submit (à la place de click) puis validateForm() comme juste au dessus!*/
  const form = document.getElementById('formModal')
  form.addEventListener('submit', validateForm)
}



