function start() {
   
    let inputBox = document.getElementById("x");
    let score = document.getElementById("score");
    let timeDisplay = document.getElementById("time");
    var inputValue = "";
   
    var sc = 0;
    var tm = 5; // Initial time
    var timer;
   
    function updateTimer() {
        let currentTime = new Date().getTime();
        let elapsedTime = (currentTime - startTime) / 1000;
        let remainingTime = Math.max(0, tm - elapsedTime);
        timeDisplay.innerText = remainingTime.toFixed(0);

        if (remainingTime === 0) {
            clearInterval(timer);
            let pla = confirm("'You loss' Your score is " + sc + " do you want to continue?");
            if (pla) {
                location.reload();
            } else {
                window.close();
            }
        }
    }

    var startTime = 0; // Variable to store the start time

    function fetchNewWord() {
        document.getElementById("gamestatus").innerHTML = "<b> Game is going on... </b>";
        fetch('https://random-word-api.herokuapp.com/word')
            .then(response => response.json())
            .then(data => {
                const randomWord = data[0];
                document.getElementById("word").innerHTML = randomWord;
                check = randomWord;
                tm = 6; // Reset the timer to 5 seconds when a new word is fetched
                startTime = new Date().getTime(); // Set the start time
                timer = setInterval(updateTimer, 1000); // Start a new timer
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Initial call to fetch a new word and start the timer
    fetchNewWord();

    inputBox.addEventListener('input', function () {
        inputValue = inputBox.value;
        if (inputValue === check) {
            sc++;
            score.innerHTML = sc;
            inputBox.value = "";
            clearInterval(timer); // Clear the timer
            fetchNewWord();
            //tm=6;
        }
    });
}
