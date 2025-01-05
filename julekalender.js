///////////////////// Main divs
const mainframe = document.createElement("div");
mainframe.className = "mainframe";
document.body.appendChild(mainframe)

const header = document.createElement("div");
header.className = "header";
header.textContent = "Julekalender";
mainframe.appendChild(header);

const maincontent = document.createElement("div");
maincontent.className = "maincontent";
mainframe.appendChild(maincontent);

const footer = document.createElement("div");
footer.className = "footer";
mainframe.appendChild(footer);

const footerdivs = ["empty", "reset", "sound"];
footerdivs.forEach((divname) => {
    const div = document.createElement("div");
    div.className = divname;
    footer.appendChild(div);
});

const resetDiv = document.querySelector(".reset");
const resetbutton = document.createElement("button");
resetbutton.textContent = "Reset calendar";
resetbutton.className = "resetbutton";
resetDiv.appendChild(resetbutton);

resetbutton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
});
////////////////// Main divs
////////////////// Boxes 
const STORAGE_KEY = "calendarprogress";
const savedprogress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const calendar = document.createElement("div");
calendar.className = "calendar";

for (let i = 1; i <= 24; i++){
    const box = document.createElement("div");
    box.className = "box";
    box.dataset.boxId = i;

   if (savedprogress.includes(i)) {
       box.classList.add("closed");
       box.textContent = "X";
   }else {
      const boxnumber = document.createElement("div");
      boxnumber.className = "boxnumber";
      boxnumber.textContent = i;
      box.appendChild(boxnumber);
   }

   box.addEventListener("click", () => boxclicked(box,i));
   calendar.appendChild(box);
}

maincontent.appendChild(calendar);

function boxclicked(box,id) {
    if(!box.classList.contains("closed")){
        box.classList.add("closed");
        box.textContent = "X";

        savedprogress.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedprogress));

        openPopup(id);
    }
}
////////////////// Boxes 
//////////////// Audio block
const songs = [
    "/Songs/1.mp3",
    "/Songs/2.mp3",
    "/Songs/3.mp3",
];

const audio = new Audio(songs[Math.floor(Math.random() * songs.length)]);
audio.loop = true;
audio.play(); /// Web browser restrictions?

const soundDiv = document.querySelector(".sound");

let soundonicon = "/Photo/volumeon.png"
let soundofficon = "/Photo/volumeoff.png"

const icon = document.createElement("img");
icon.src = soundonicon;
icon.alt = "Sound Icon";
icon.style.width = "24px";
icon.style.height = "24px";

soundDiv.appendChild(icon);

soundDiv.addEventListener("click", () => {
    if (audio.paused){
        audio.play();
        icon.src = soundonicon;
    } else {
        audio.pause();
        icon.src = soundofficon;
    }
});

//////////////// Audio block
////////////// Popup box codeblock
function openPopup(boxnumber) {
    const popupbox = document.createElement("div");
    popupbox.className = "popupbox";
    document.body.appendChild(popupbox);

    const popup = document.createElement("div");
    popup.className = "popup";
    popupbox.appendChild(popup);

    const boxnumberdiv = document.createElement("div");
    boxnumberdiv.className = "boxnumberdiv";
    boxnumberdiv.textContent = `Calender day: \n${boxnumber}`;
    boxnumberdiv.style.whiteSpace = "pre";
    popup.appendChild(boxnumberdiv);

    const contentdiv = document.createElement("div");
    contentdiv.className = "popupcontent";
    popup.appendChild(contentdiv);

    const contentdiv2 = document.createElement("div");
    contentdiv2.className = "popupcontent2";
    popup.appendChild(contentdiv2);

    const closediv = document.createElement("div");
    closediv.className = "popupclose";
    closediv.textContent = "Close";
    popup.appendChild(closediv);

    closediv.addEventListener("click", () =>{
        popupbox.remove();
    });

    fetch('https://v2.jokeapi.dev/joke/Christmas')
    .then(response => response.json())
    .then (data => {
        if(data.joke) {
            document.querySelector('.popupcontent2').textContent = data.joke;
        } else {
            document.querySelector('.popupcontent2').textContent = `${data.setup} - ${data.delivery}`;
        }
    }) 

    fetch('https://opentdb.com/api.php?amount=1&category=15&type=multiple')
         .then(response => response.json())
         .then(data => {
            const triviaquestion = data.results[0];
            const question = triviaquestion.question;
            const correctanswer = triviaquestion.correct_answer;
            const incorrectanswer = triviaquestion.incorrect_answers;

            const questionelement = document.createElement("div");
            questionelement.className = 'triviaquestion';

            const questiontitle = document.createElement('strong');
            questiontitle.textContent = 'Trivia Question:\n ';
            questionelement.appendChild(questiontitle);

            const questiontext = document.createElement('span');
            questiontext.textContent = question;
            questionelement.appendChild(questiontext)

            contentdiv.appendChild(questionelement);

            const optionselement = document.createElement('div');
            optionselement.className = "triviaoption";

            const alloptions = [...incorrectanswer, correctanswer];
            alloptions.sort(() => Math.random() - 0.5);

            alloptions.forEach(option => {
                const optionbutton = document.createElement("button");
                optionbutton.className = "triviabutton";
                optionbutton.textContent = option;

                optionbutton.addEventListener('click', () => {
                    optionselement.querySelectorAll('button').forEach(button => {
                        button.disabled = true;
                    });

                    if (option === correctanswer) {
                        optionbutton.style.backgroundColor = 'green';
                    } else {
                        optionbutton.style.backgroundColor = 'red';
                    }
                });
                optionselement.appendChild(optionbutton)
            });
            contentdiv.appendChild(optionselement);
         })
         .catch(err => console.error("Something wrong", err));
}

    // .catch(err => console.error('Fetching problem',err));

    // fetch('https://api.thecatapi.com/v1/images/search')
    //    .then(response => response.json())
    //    .then(data => {
    //     const imageurl = data[0].url;
    //     popup.style.backgroundImage = `url(${imageurl})`;
    //     popup.style.backgroundSize = "cover";
    //     popup.style.backgroundPosition = "center";
    //    })
    //    .catch(err => console.error("Failed fetch image", err));

    
