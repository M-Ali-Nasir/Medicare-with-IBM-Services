let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

const openModalBtn = document.querySelector(".open-modal-btn");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModal");

    // Open modal when button is clicked
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // Close modal when 'X' button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
const textInput = document.getElementById('text-input');
const convertButton = document.getElementById('convert-button');

// Function to enable or disable the button based on input
textInput.addEventListener('input', () => {
    convertButton.disabled = textInput.value.trim() === "";
});

// Initialize button as disabled if the input is empty
convertButton.disabled = true;



