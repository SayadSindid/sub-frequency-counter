// Stuff dunno
export interface parseOutput {
    [key: number]: 
}


// TODO: Found a way to make all the ? as options so like sub.parse(myfile, {start: true or false, end: true or false ect..})
// TODO: change start and end to be a singular thing like TimeStamp which include both end and start
export interface result {
    content: string, // content of the sub
    start?:number, // Start of subtitle in ms
    end?: number, // End of subtitle in ms
    index?: number, // Index of the subtitle (e.g.: Position as a number among all of the sub)
    duration?: number, // Calculated duration of the caption
}
