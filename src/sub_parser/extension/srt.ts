import type { ParsedResult } from "../..";



export function srtParcing(file: string): ParsedResult[] {
    let data: ParsedResult[] = [];
    // Regex making 4 group out of the cleaned string
    const regexGrouper: RegExp = /^(?<index>\d+)\s+(?<start>\d{2}:\d{2}:\d{2},\d{3})\s+-->\s+(?<end>\d{2}:\d{2}:\d{2},\d{3})\s+(?<content>.+)$/g
    let arrSplit: string[] = [];
    // Get every subtitle line as a an array of string.
    // Check if the sub file use \r or only \n
    if (file.includes("\r")) {
        arrSplit = file.split("\r\n\r\n")
    } else {
        arrSplit = file.split("\n\n")
    }
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
