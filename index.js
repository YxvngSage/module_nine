const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// document.querySelector('button').onclick = () => {
    fetch('https://thecatapi.com/v1/images?', {method: 'GET'}).then(result => {
        console.log(result);
    });
// }

//api_key=10e7b594-bb9c-4b88-b486-47fd2c26ec57