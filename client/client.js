console.log("Hello World");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading'); 
const squeaksElement = document.querySelector('.squeaks')
const SQUEAK_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/squeaks' : 'https://ratpackwastaken.herokuapp.com/squeaks';


loadingElement.style.display = ''; 

listAllSqueaks();

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

    fetch(SQUEAK_URL, {
        method: 'POST',
        body: JSON.stringify(squeak),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdSqueak => {
        // when finished submitting, re-display form
        form.reset();
        form.style.display = ''; 
        listAllSqueaks();
        loadingElement.style.display = 'none'; 
      });
}); 

function listAllSqueaks() {
    squeaksElement.innerHTML = '';
    fetch(SQUEAK_URL)
        .then(response => response.json())
        .then(squeaks => {
            console.log(squeaks);
            squeaks.reverse(); 
            squeaks.forEach(squeak => {
                const div = document.createElement('div'); 

                const header = document.createElement('h3'); 
                header.textContent = squeak.name;

                const contents = document.createElement('p');
                contents.textContent = squeak.content; 

                const date = document.createElement('small'); 
                date.textContent = new Date(squeak.created); 

                div.appendChild(header); 
                div.appendChild(contents); 
                div.appendChild(date); 
                

                squeaksElement.appendChild(div);
            });
            loadingElement.style.display = 'none'; 
        });
             
        
}