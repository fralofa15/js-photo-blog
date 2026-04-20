// @ts-check
'use strict';
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';
// Recupero il contenitore per le card
const cardContainerElement = document.querySelector('#card-container');

/**
 * @param {{ id: number, title: string, date: string, url: string}[]} post
 */

function cardGenerator(post) {

    //Controllo se cardContainerElement è null
    if (cardContainerElement === null) {
        console.log("Elemento non trovato");
        return;
    }

    // Ciclo for per generare le card
    for (let i = 0; i < post.length; i++) {
        const currentPost = post[i];

        //Scrivo il codice HTML per la card
        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4 card-column">
                <div class="photo-card" data-image="${currentPost.url}" data-title="${currentPost.title}">

                    <div class="red-pin">
                        <img src="img/pin.svg" alt="red-pin">
                    </div>

                    <div class="photo-container">
                        <img src="${currentPost.url}" alt="${currentPost.title}">
                    </div>

                    <p class="photo-date">${currentPost.date}</p>
                    <h2 class="photo-title">${currentPost.title}</h2>
                </div>
            </div>
        `;
        cardContainerElement.innerHTML += cardHTML;
    }
    //Recupero tutte le card appena create
    const cards = document.querySelectorAll('.photo-card');

    //Per ogni card aggiungo un evento click
    cards.forEach(card => {

        //Funzione per aggiungere l'evento click alla card
        card.addEventListener('click', () => {

            //Recupero i dati dell'immagine dalla card cliccata
            const imageUrl = card.getAttribute('data-image');
            const imageTitle = card.getAttribute('data-title');

            //Controllo se i dati recuperati sono validi
            if (imageUrl !== null && imageTitle !== null) {

                //richiamo la funzione per l'overlay 
                showOverlay(imageUrl, imageTitle);
            }
        });
    });
}

/**
 * @param {string} imageUrl
 * @param {string} imageTitle
 */

function showOverlay(imageUrl, imageTitle) {
    const overlay = document.querySelector('.image-overlay');

    if (overlay === null) {
        console.log("Elemento non trovato");
        return;
    }

    // Inserisco contenuto nell'overlay
    overlay.innerHTML = `
        <div class="overlay-content">
            <img class="overlay-image" src="${imageUrl}" alt="${imageTitle}">
            <button class="close-button">Chiudi</button>
        </div>
    `;

    // aggiungo la classe active per mostrare l'overlay
    overlay.classList.add('active');

    // Prendo il bottone appena creato
    const closeBtn = overlay.querySelector('.close-button');

    //SE il bottone esiste aggiungo l'evento per chiudere l'overlay
    if (closeBtn !== null) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.innerHTML = '';
        });
    }
}

fetch(API_URL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);

        // Chiamo la funzione per generare le card
        cardGenerator(json);
    })
    .catch(error => {
        console.log(error);
    })