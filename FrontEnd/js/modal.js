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

const displayGallery = (gallery) => {
    const baliseImage = document.createElement("img")
    baliseImage.src = gallery.imageUrl
    worksModal.appendChild(baliseImage)
}

let modal = document.getElementById("modal1")
let firstPage = document.getElementById("modalFirstPage")
let secondPage = document.getElementById("modalSecondPage")

const openModal = function (e) {
  e.preventDefault()
  modal.style.display = "flex"
  modal.removeAttribute('aria-hidden')
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal)
  modal.querySelector('.jsModalClose').addEventListener('click', closeModal)
  modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
}

const openAddProjetFormModal = function (e) {
  e.preventDefault()
  firstPage.style.display = "none"
  secondPage.style.display ="flex"
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


const initModal = async function() {
  const travauxModal = await displayGalleryModal()
  console.log(travaux.Modal)
  travauxModal.forEach(gallery => {
    displayGallery(gallery)
  })
  displayGalleryModal()
  modal.querySelector('.addPhoto').addEventListener('click', openAddProjetFormModal)
}



