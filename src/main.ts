import './style.css';
import { Sub } from './sub_parser/srt';

const submitButton = document.getElementById("submit") as HTMLButtonElement;
const filesInputs = document.getElementById("subFilesList") as HTMLInputElement;

// TODO: Implement check for .srt, .ass, .vtt check with a regex in the file name


filesInputs.addEventListener("change", async function(e) {
    const target = e.target as HTMLInputElement
    const files = (target.files as FileList);

    const gg = await readMultiplesFiles(files);

    const sub = new Sub();
    
    let result = sub.parse(gg[0], { 
        subtype: "srt" 
    })

    let resultFreq = sub.freq(result);

    console.log(resultFreq);

    
})

async function readMultiplesFiles(files: FileList) {

    let arrayStringSubtitlesFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
        let file = await files[i].text()
        arrayStringSubtitlesFiles.push(file);
    }

    return arrayStringSubtitlesFiles;
}


submitButton.addEventListener("click", function() {
    // const blob = new Blob(JSON.stringify())
    // file.readAsText()
})