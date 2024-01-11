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

let modal = null

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute("href"))
  target.style.display = "flex"
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.jsModalClose').addEventListener('click', closeModal)
  modal.querySelector('.jsModalStop').addEventListener('click', stopPropagation)
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
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}


document.querySelectorAll('.jsModal').forEach(a => {
  a.addEventListener('click', openModal)
})


const initModal = async function() {
  const travauxModal = await displayGalleryModal()
  console.log(travaux.Modal)
  travauxModal.forEach(gallery => {
    displayGallery(gallery)
  })
  displayGalleryModal()
}



