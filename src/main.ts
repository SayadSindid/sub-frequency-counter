import './style.css';
import { Sub } from './sub_parser/common';


const submitButton = document.getElementById("submit") as HTMLButtonElement;
const filesInputs = document.getElementById("subFilesList") as HTMLInputElement;

// TODO: Implement check for .srt, .ass, .vtt check with a regex in the file name


filesInputs.addEventListener("change", async function(e) {
    const target = e.target as HTMLInputElement
    const files = (target.files as FileList);

    const gg = await readMultiplesFiles(files);


    const sub = new Sub();
    
    let parsedgg = sub.parse(gg, {
        subtype:"srt"
    })
    
    
    const freqgg = sub.freq(parsedgg)

    transformFreqMapToText(freqgg)
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
    // FIXME: When click it should open the new window with all the freq 
})

function transformFreqMapToText(frequencyMap: Map<string, number>) {

    let freqData: string = "";
    frequencyMap.forEach(orderMapElements)

    function orderMapElements(value: number, key: string, _: Map<string, number>) {
        // FIXME: Insert a linebreak \n doesn't work unfortunately
        freqData +=`${key} - ${value}`
        freqData += "\n"
    }

    createNewHTMLPage(freqData)

}

function createNewHTMLPage(text: string) {
    // TODO: Add some style (Black background)
    let newPage = window.open("")
    newPage?.document.writeln(text)
}