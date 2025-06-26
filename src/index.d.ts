// Stuff dunno
export interface parseOutput {
    // [key: number]: 
}


export interface ParsedResult {
    content: string, // content of the sub
    start:number, // Start of subtitle in ms
    end: number, // End of subtitle in ms
    index?: number, // Index of the subtitle (e.g.: Position as a number among all of the sub)
    duration?: number, // Calculated duration of the caption
}

export interface ParseOptions {
    subtype: "srt" | "ass" | "vtt",
    index?: boolean,
    timestamp?: boolean,
    // TODO: If Timestamp === true, add start and end to the result
    duration?: boolean,
}
