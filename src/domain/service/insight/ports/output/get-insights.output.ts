export class GetInsightsOutput {
    timecode: string;
    text: string;
    
    constructor(output: GetInsightsOutput) {
        this.timecode = output.timecode;
        this.text = output.text;
    }
}