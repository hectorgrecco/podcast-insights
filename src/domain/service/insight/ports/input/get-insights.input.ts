export class GetInsightsInput {
    timecode: string;
    text: string;
    
    constructor(input: GetInsightsInput) {
        this.timecode = input.timecode;
        this.text = input.text;
    }
}