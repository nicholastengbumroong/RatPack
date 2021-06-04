console.log("Hello World");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading'); 

loadingElement.style.display = 'none'; 


form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const formData = new FormData(form); 
    console.log('form submitted');
    const name = formData.get('name');
    const content = formData.get('content');

    const squeak = {
        name,
        content
    };
    console.log(squeak);
    form.style.display = 'none'; 
    loadingElement.style.display = ''; 
});  