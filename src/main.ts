import './style.css';
import { Sub } from './sub_parser/common.js';


const submitButton = document.getElementById("submit") as HTMLButtonElement;
const filesInputs = document.getElementById("subFilesList") as HTMLInputElement;

// TODO: Implement check for .srt, .ass, .vtt check with a regex in the file name


async function readMultiplesFiles(files: FileList) {

    let arrayStringSubtitlesFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
        let file = await files[i].text()
        arrayStringSubtitlesFiles.push(file);
    }

    return arrayStringSubtitlesFiles;
}


submitButton.addEventListener("click", async function() {
    const userFilesInput = filesInputs as HTMLInputElement
    const userFiles = (userFilesInput.files as FileList);

    const userSubFiles = await readMultiplesFiles(userFiles);


    const sub = new Sub();
    
    const parsedUserSubFiles = sub.parse(userSubFiles, {
        subtype:"srt"
    })
    
    
    const freqUserSubFiles = sub.freq(parsedUserSubFiles)

    transformFreqMapToText(freqUserSubFiles)
})

function transformFreqMapToText(frequencyMap: Map<string, number>) {

    let freqData: string = "";
    frequencyMap.forEach(orderMapElements)

    function orderMapElements(value: number, key: string, _: Map<string, number>) {
        freqData +=`${key} - ${value}`
        freqData += "\n"
    }

    createNewHTMLPage(freqData)

}

function createNewHTMLPage(text: string) {
    let newPage = window.open("") as Window
    const newPageBody = newPage.document.querySelector("body") as HTMLBodyElement;
    newPageBody.innerText = text;
    // Style stuff
    newPageBody.style.paddingLeft += "6px"
    newPageBody.style.color += "white"
    newPageBody.style.fontWeight += "500"
}