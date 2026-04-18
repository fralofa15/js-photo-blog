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

                    <div class="red-pin"></div>

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