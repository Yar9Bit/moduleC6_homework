const button = document.querySelector('button')

button.addEventListener('click', () => {
    const height = window.screen.height
    const width = window.screen.width
    alert(width) || alert(height)
})