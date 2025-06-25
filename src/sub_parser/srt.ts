import type { FrequencyResult, ParseOptions, ParsedResult } from "../index";

export class Sub {
    //No constructor

    // return type = ParseResult[]
    parse(file: string, options: ParseOptions): ParsedResult[] {
        let data: ParsedResult[] = [];

        if (options.subtype === "srt") {
            // Regex making 4 group out of the cleaned string
            const regexGrouper: RegExp = /^(?<index>\d+)\s+(?<start>\d{2}:\d{2}:\d{2},\d{3})\s+-->\s+(?<end>\d{2}:\d{2}:\d{2},\d{3})\s+(?<content>.+)$/g

            // Get every subtitle line as a an array of string.
            const arrSplit = file.split("\r\n\r\n")
            // Remove escape characters
            const noEscapeArr = arrSplit.map((x) => x.replaceAll("\r\n", " "));
            for (let i = 0; i < noEscapeArr.length; i++) {
                const element = noEscapeArr[i];
                let matchedRegex = [...element.matchAll(regexGrouper)][0];
                // Skip if match is empty
                if (matchedRegex === undefined) {
                    continue;
                }
                // Skip if groups is undefined
                if (!matchedRegex.groups) {
                    continue;
                } else {
                    const { index, start, end, content} = matchedRegex.groups
                    // HMS = Hours, Minutes, Seconds
                    const [ startHMSString, startMSString] = start.split(",");
                    const [ startHours, startMinutes, startSeconds] = Array.from(startHMSString.split(":"), Number);
                    const [ endHMSString, endMSString] = end.split(",");
                    const [ endHours, endMinutes, endSeconds] = Array.from(endHMSString.split(":"), Number);

                    const startInMS = (startHours * 3600000 + startMinutes * 60000 + startSeconds * 1000) + Number(startMSString);
                    const endInMS = (endHours * 3600000 + endMinutes * 60000 + endSeconds * 1000) + Number(endMSString);
                    const duration = endInMS - startInMS;
                    data.push({content: content, start: startInMS, end: endInMS, duration: duration, index: Number(index)})
                }
            }
            return data;
        }

        return data;
    }

    //FIXME: the freq method need to run on multiples parsed files.
    //FIXME: We need to sort the data object by it's value.
    freq(parsedFile: ParsedResult[]): FrequencyResult {
        // Symbols, Punctuation ect..
        const regexCleaning:RegExp = /(?:[^\w\s'\p{L}]|(?<!\w)'(?!\w)|'(?=\s)|(?<=\s)')+|(?<=\s)\s+/gu
        // Non breaking space char
        const regexSpaceCleaning: RegExp = /[\u00A0\u1680\u2000-\u200F\u202F\u205F\u3000\uFEFF]/gu
        let data: FrequencyResult = {};
        for (const element of parsedFile) {
            const cleanedElement = element.content.replaceAll(regexCleaning, "").replaceAll(regexSpaceCleaning, " ").trim().toLocaleLowerCase();
            for (let i = 0; i < cleanedElement.split(" ").length; i++) {
                const word = cleanedElement.split(" ")[i];
                data[word] ? data[word] += 1 : data[word] = 1
            }
        }
        return data;
    }


}