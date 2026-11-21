import { Coordinate } from "./coordinate"
import { Media } from "./media"

export class Trail {
    id?: string = ""
    name: string = ""
    path: Coordinate[] = []
    length: number = 0
    difficulty: string = ""
    ratings: number[] = [0]
    location: string = ""
    time: number = 0
    description: string = ""
    features: string[] = [""]
    media: Media[] = [];
    uid?: string = "";

    constructor(
        path: Coordinate[],
        name: string,
        lengthIn: number,
        difficultyIn: string,
        ratingsIn: number[],
        locationIn: string,
        timeIn: number,
        descriptionIn: string,
        featuresIn: string[],
        mediaIn: Media[],
        uid?: string,
        id?: string
    ) {
        this.path = path
        this.name = name
        this.length = lengthIn
        this.difficulty = difficultyIn
        this.ratings = ratingsIn
        this.location = locationIn
        this.time = timeIn
        this.description = descriptionIn
        this.features = featuresIn
        this.media = mediaIn;
        this.uid = uid;
        this.id = id;
    }

}