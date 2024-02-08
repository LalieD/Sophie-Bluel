const worksModal = document.querySelector(".galleryModal")

/* Je récupère les projets depuis l'API comme déjà fait précédemment */

const getGalleryModal = () => {
  return fetch(url1)
  .then (function (res) {
      return res.json()
  })
  .catch(function (error) {
      console.log(error)
  })
}

/* J'affiche la galerie dans la première page de la modale en créant les balises qui la contiennent ainsi que les boutons de suppression des projets */

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

    /* Gestionnaire d'évènements pour le bouton de suppression */

    buttonDelete.addEventListener('click', async (event) => {
      event.preventDefault()
      if(confirm("Voulez-vous vraiment supprimer ce projet ?")) {
        await deleteWork(work.id)
        baliseFigure.remove()
      }
    })
}


/*Test fonction de suppression des projets*/
const deleteWork = async (projectId) => {
  const url = `http://localhost:5678/api/works/${projectId}`
  
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du projet')
    }

    const works = await getTravaux()
    console.log(works)
    travaux.innerHTML = ''
    works.forEach(work => {
        displayWork(work)
    })

    console.log('Projet supprimé avec succès')
  } catch (error) {
    console.error('Erreur lors de la suppresion du projet', error.message)
  }
}

/* Je récupère les noms des filtres depuis l'API comme déjà fait précédemment */

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

/* Je récupère la balise aside contenant toute la modale puisles deux pages indépendamment */

let modal = document.getElementById("modal1")
let firstPage = document.getElementById("modalFirstPage")
let secondPage = document.getElementById("modalSecondPage")

/* J'ouvre la modale en l'affichant et j'appelle la fonction qui ferme la modale sur les boutons de fermeture */

const openModal = function (e) {
  e.preventDefault()
  modal.style.display = "flex"
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.querySelector('.jsModalClose').addEventListener('click', closeModal)
  modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

/* J'ajoute les catégories récupérées depuis l'API dans ma balise select et j'y ajoute une option vide qui ne séléctionne aucune catégorie */

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

/* Ici c'est la fonction qui permet de prévisualiser l'image qui a été ajoutée dans l'input file */

function handleFileSelect(event) {
  const files = event.target.files
  const previewImage = document.getElementById('previewImage')
  const inputPhoto = document.querySelector('.inputPhoto')

  if(files.length > 0) {
    const selectedFile = files[0]

    const reader = new FileReader()

    reader.onload = function () {
      previewImage.src = reader.result
      previewImage.style.display = 'block'
    
     
      inputPhoto.classList.add('hide-on-preview')
      
    }

    reader.readAsDataURL(selectedFile)
  } else {
    previewImage.style.display = 'none'
    
    inputPhoto.classList.remove('hide-on-preview')

    console.log('Aucun fichier sélectionné')
  }
 }


/* Je cache la première page de la modale pour afficher la seconde page de la modale */

const openAddProjetFormModal = function (e) {
  e.preventDefault()
  firstPage.style.display = "none"
  secondPage.style.display ="flex"
  displayCategoryModal()

  /*Preview de l'image*/
  const fileInput = document.getElementById('fileInput')
  fileInput.addEventListener('change', handleFileSelect)

}

/* Je cache la seconde page de la modale pour revenir sur la première page de la modale */

const openGalleryModal = () => {
  secondPage.style.display = "none"
  firstPage.style.display = "flex"
}

/* Je fais une fonction qui ferme la modale dans son entièreté */

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  document.getElementById('formModal').reset()
  
  const previewImage = document.getElementById('previewImage')
  const inputPhoto = document.querySelector('.inputPhoto')
  previewImage.style.display = 'none'
  inputPhoto.classList.remove('hide-on-preview')

  firstPage.style.display = "flex"
  secondPage.style.display ="none"
}

/* Cela permet d'empêcher la propagation de l'évènement de clic */

const stopPropagation = function (e) {
  e.stopPropagation()
} 

/* Je récupère le bouton du mode édition et je lui ajoute l'évènement d'ouverture de la modale */

document.querySelectorAll('.jsModal').forEach(button => {
  button.addEventListener('click', openModal)
})

/*Rafraîchir la galerie de la modale*/ 

const refreshGalleries = async () => {
  /*Vider la galerie*/
  worksModal.innerHTML = ''

  const travauxModal = await getGalleryModal()
  travauxModal.forEach(gallery => {
    displayGallery(gallery)
  })
}

/* Ici c'est une fonction qui permet de contrôler les différents champs présents dans le formulaire de la seconde page de la modale */

const validateForm = async function (e) {
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
  errorSelectCategory.textContent = 'Veuillez sélectionner une catégorie'
 }
 
 /*Soumission du formulaire si tous les champs sont valides*/
 if (errorTitle.textContent === '' && errorFileInput.textContent === '' && errorSelectCategory.textContent === '') {
  const formData = new FormData()
  formData.append('title', titleInput.value)
  formData.append('category', selectCategory.value)
  formData.append('image', fileInput.files[0])
  
  try {
    const token = localStorage.getItem('token')
    
    const response = await fetch ("http://localhost:5678/api/works", {
      method: 'POST',
      body: formData,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi des données')
    }

    const work = await response.json()

    await refreshGalleries()
    displayWork(work)
    closeModal(e)
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données')
    console.log(error)
  }
 }
}

/* J'affiche la galerie dans la modale, sur le bouton d'ajout de projet j'ouvre la seconde page de la modale et je peux retourner en arrière avec la flèche de retour, enfin, je récupère le formulaire présent sur la seconde page et je lui ajoute un évènement submit */

const initModal = async function() {
  const travauxModal = await getGalleryModal()
  travauxModal.forEach(gallery => {
    displayGallery(gallery)
  })
  getGalleryModal()
  modal.querySelector('.addPhoto').addEventListener('click', openAddProjetFormModal)
  modal.querySelector('.jsModalReturn').addEventListener('click', openGalleryModal)
  modal.querySelectorAll('.jsModalClose').forEach(Element => {
    Element.addEventListener('click', closeModal)
  })
  /* Récupérer le formulaire via l'id, ajouter un event de submit (à la place de click) puis validateForm() comme juste au dessus!*/
  const form = document.getElementById('formModal')
  form.addEventListener('submit', validateForm)

}



