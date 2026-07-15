export class Trail {
    length: number = 0
    difficulty: string = ""
    ratings: number[] = [0]
    location: string = ""
    time: number = 0
    description: string = ""
    features: string[] = [""]

    constructor(lengthIn: number, difficultyIn: string, ratingsIn: number[], locationIn: string, timeIn: number, descriptionIn: string, featuresIn: string[],) {
        this.length = lengthIn
        this.difficulty = difficultyIn
        this.ratings = ratingsIn
        this.location = locationIn
        this.time = timeIn
        this.description = descriptionIn
        this.features = featuresIn
    }

}