// Start option game

let gameOptions = document.querySelectorAll(".start .begin div");
let time = 0;
let score = 0;
let theWord;

gameOptions.forEach(gameOption => {
    gameOption.addEventListener("click", e => {
        console.log(e.target.innerHTML, typeof e.target.innerHTML);
        let option = e.target.innerHTML;
        document.querySelectorAll(".container .info span")[0].innerHTML = `[ ${option} ]`;
        if(option.toLowerCase() == "easy") {
            document.querySelectorAll(".container .info span")[1].innerHTML = "[ 9 ]";
            document.querySelector(".time span").innerHTML = 9;
            time = 7000;
        } else if(option.toLowerCase() == "medium") {
            document.querySelectorAll(".container .info span")[1].innerHTML = "[ 6 ]";
            document.querySelector(".time span").innerHTML = 6;
            time = 5000;
        } else {
            document.querySelectorAll(".container .info span")[1].innerHTML = "[ 3 ]";
            document.querySelector(".time span").innerHTML = 3;
            time = 3000;
        }

        document.querySelector(".start").style.display = "none";
    });
});

let words = ["programming", "code", "javascript", "html", "css", "java", "react", "test", "youtube", "linkedin", "c++", "python", "php"
    , "twitter", "github", "facebook", "instagram", "leetcode", "codeforces", "codechef", "atcoder", "hacker rank"];

document.querySelectorAll(".score span")[1].innerHTML = words.length;


let wordTyping = document.querySelector(".playing");

wordTyping.addEventListener("click",  () => {
    document.querySelector("input").focus();

    // display the word that you have to write on input
    wordTyping.innerHTML = "";
    wordTyping.classList = `${wordTyping.classList} active`;

    getWords();

    Timer();

    countSeconds();
});

document.querySelectorAll("button")[0].onclick = ()=> window.location.reload();
document.querySelectorAll("button")[1].onclick = ()=> window.location.reload();

function getWords() {
    document.querySelector(".words").innerHTML = "";

    let randomWord = Math.floor(Math.random() * words.length);
    theWord = words[randomWord];
    wordTyping.innerHTML = theWord;

    words.splice(randomWord, 1);
    words.forEach(w => {
        let word = document.createElement("span");
        word.innerHTML = w;
        
        document.querySelector(".words").appendChild(word);
    });
}

function Timer() {
    let timer = setInterval(function() {
        let inputField = document.querySelector("input");
        
        if(inputField.value !== theWord) {
            document.querySelector(".game-over").style.display = "flex";
            clearInterval(timer);
        } else {
            if(words.length == 0) {
                document.querySelector(".win").style.display = "flex";
                clearInterval(timer);
            }

            document.querySelector(".score span").innerHTML = ++score;
            
            getWords();
            
            inputField.value = "";
        }
    }, time);
}

function countSeconds() {
    let scoreChange = score;

    let seconds = setInterval(function() {
        --document.querySelector(".time span").innerHTML;

        if(document.querySelector(".time span").innerHTML <= 0) {
            if(scoreChange == score) {
                clearInterval(seconds);
            } else {
                scoreChange = score;
                document.querySelector(".time span").innerHTML = time / 1000;
            }
        }
    }, 1000);
}