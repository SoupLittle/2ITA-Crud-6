import wordData from './myIndex.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAm5vWqAHLzjdgIS8EmJchJS4iPpxjDbGM",
    authDomain: "js-crud-6.firebaseapp.com",
    databaseURL: "https://js-crud-6-default-rtdb.firebaseio.com//",
    projectId: "js-crud-6",
    storageBucket: "js-crud-6.appspot.com",
    messagingSenderId: "645171095901",
    appId: "1:645171095901:web:14613de111ff2868c7e0b4",
    measurementId: "G-TB94DXZZC7"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const getWordBtn = document.getElementById('get-word-btn');
const wordInput = document.getElementById('word-input');
const guessBtn = document.getElementById('guess-btn');
const hintDiv = document.getElementById('hint');
const resultDiv = document.getElementById('result');

let correctWord;

getWordBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * wordData.length);
  correctWord = wordData[randomIndex];
  hintDiv.innerText = `Hint: ${correctWord.forklaring}`;

    // Upload word, category, and description to Firebase
    set(ref(database, 'currentWord'), {
        ord: correctWord.navn,
        kategori: correctWord.kategori,
        forklaring: correctWord.forklaring
      });
});



guessBtn.addEventListener('click', () => {
  const guessedWord = wordInput.value.trim().toLowerCase();
  if (guessedWord === '') {
    alert('Please enter a word.');
    return;
  }

  if (guessedWord === correctWord.navn.toLowerCase()) {
    alert('Congratulations! You guessed correctly!');
    resultDiv.innerHTML = `
      <p>Ord: ${correctWord.navn}</p>
      <p>Kategori: ${correctWord.kategori}</p>
    `;
  } else {
    alert('Sorry, wrong guess. Try again!');
    resultDiv.innerHTML = '';
  }

  wordInput.value = '';
});

