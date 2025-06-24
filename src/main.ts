import './style.css';

const submitButton = document.getElementById("submit") as HTMLButtonElement;
const filesInputs = document.getElementById("subFilesList") as HTMLInputElement;

// TODO: Implement check for .srt, .ass, .vtt check with a regex in the file name

let rawSubFilesJSON: string[] = []
let file: object;


filesInputs.addEventListener("change", function(e) {
    const target = e.target as HTMLInputElement
    const files = (target.files as FileList);

    const gg = readMultiplesFiles(files);

    console.log(gg);

})

function readMultiplesFiles(files: FileList) {

    let arrayStringSubtitlesFiles: string[] = [];

    function readNewFile(file: File) {
        const reader = new FileReader()

        reader.addEventListener("load", function() {
            if (typeof this.result === "string") {
                arrayStringSubtitlesFiles.push(this.result)
            } else {
                console.log(`TypeError: ${this} is not a string.`)
            }
        })

        reader.addEventListener("error", function() {
            console.log("Error when reading the file.", this)
        })

        reader.readAsText(file)
    }

    for (let i = 0; i < files.length; i++) {
        readNewFile(files[i])
    }

    return arrayStringSubtitlesFiles;
}


submitButton.addEventListener("click", function() {
    // const blob = new Blob(JSON.stringify())
    // file.readAsText()
})