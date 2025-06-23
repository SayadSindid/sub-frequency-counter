import fs from 'fs';
import './style.css';
import { parse, resync } from 'subtitle';

const submitButton = document.getElementById("submit") as HTMLButtonElement;

const file = new FileReader();


fs.createReadStream("./gg.srt")
    .pipe(parse())
    .pipe(resync(-100))

submitButton.addEventListener("click", function() {
    // const blob = new Blob(JSON.stringify())
    // file.readAsText()
})