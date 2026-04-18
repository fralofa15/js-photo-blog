// @ts-check
'use strict';
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';
// Recupero il contenitore per le card
const cardContainerElement = document.querySelector('#card-container');

/**
 * @param {{ id: number, title: string, date: string, url: string}[]} post
 */

fetch(API_URL)
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        console.log(error);
    })