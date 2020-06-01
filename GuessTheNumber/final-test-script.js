// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();

checkButton.addEventListener('click', checkGuess)
newGuess.addEventListener('keypress', checkKey)
restartButton.addEventListener('click', restart)

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100 
 και τον εκχωρεί στη μεταβλητή theGuess */
 theGuess = Math.floor(Math.random() * 100) + 1;
 console.log("The number to guess is: ",theGuess);
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>> 
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
    if (e.key === "Enter") {
        checkGuess();
        
    };
}

function checkGuess(){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει τις
κατάλληλες ενέργειες για εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
    let newValue = newGuess.value;
    console.log(previousGuesses)
    if (processGuess(newValue) === "win"){
        restartButton.style.display = "block";
        checkButton.style.display = "none";
    }


}

function processGuess(newValue){
 /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */
    newValue = parseInt(newValue);
    if (newValue === theGuess && previousGuesses.length < 10){
        message.style.backgroundColor = "green";
        message.textContent = "Μπράβο το βρήκες!"
        return "win";
    } else if (isNaN(newValue && previousGuesses.length < 10)){
        message.textContent = "Δώσε αριθμό!";
    } else if (newValue > theGuess && previousGuesses.length < 10){
        message.textContent = "Λάθος, το ξεπέρασες";
        previousGuesses.push(newValue);
    } else if (newValue < theGuess && previousGuesses.length < 10){
        message.textContent = "Λάθος, είσαι πιο χαμηλά";
        previousGuesses.push(newValue);
    }
}
function restart(){
/* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο 
'restart' και επανεκινεί τη διαδικασία */
    previousGuesses = [];
    message.textContent = "";
    lowHigh.textContent = "";
    checkButton.style.display = "inline";
    restartButton.style.display = "none";
    newRandom();
}


