import type { ParseOptions, ParsedResult } from "../index";
import { srtParcing } from "./extension/srt";

export class Sub {
    //No constructor

    parse(files:string[], options: ParseOptions): ParsedResult[][] {
        let data: ParsedResult[][] = [];

        if (options.subtype === "srt") {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                data.push(srtParcing(file, options))
            }
            return data;
        }
        return data;
    
    }


    freq(parsedFile: ParsedResult[][]): Map<string, number> {
        // Symbols, Punctuation ect..
        const regexCleaning:RegExp = /(?:[^\w\s'\p{L}]|(?<!\w)'(?!\w)|'(?=\s)|(?<=\s)')+|(?<=\s)\s+/gu
        // Non breaking space char
        const regexSpaceCleaning: RegExp = /[\u00A0\u1680\u2000-\u200F\u202F\u205F\u3000\uFEFF]/gu
        
        let data:Map<string, number> = new Map();
        for (let j = 0; j < parsedFile.length; j++) {
            const subFileParsed = parsedFile[j];

            for (const elementOfSubFileParsed of subFileParsed) {
                const cleanedSentence = elementOfSubFileParsed.content.replaceAll(regexCleaning, "").replaceAll(regexSpaceCleaning, " ").trim().toLocaleLowerCase();

                // Iterate over the sentence
                for (let i = 0; i < cleanedSentence.split(" ").length; i++) {
                    const word = cleanedSentence.split(" ")[i];
                    data.get(word) ? data.set(word, data.get(word)! + 1) : data.set(word, 1)
                }
            }
        }
        // Convert map into an array like that [[key, value], ["apple", 3], ect..] -> then proceed to sort it according to the x[1] which is the value. then transform it back to a map.
        const sortFreqAscendingOrder = new Map([...data.entries()].sort((a, b) => b[1] -  a[1]));

        return sortFreqAscendingOrder
    }

}
