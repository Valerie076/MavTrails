import { Audiobook } from "./audiobook"
import { Music } from "./music"
import { Podcast } from "./podcast"

export class Trail {
    id?: string = ""
    path: number[][] = []
    length: number = 0
    difficulty: string = ""
    ratings: number[] = [0]
    location: string = ""
    time: number = 0
    description: string = ""
    features: string[] = [""]
    music: Music[] = [];
    podcasts: Podcast[] = [];
    audiobooks: Audiobook[] = [];

    constructor(
        path: number[][],
        lengthIn: number,
        difficultyIn: string,
        ratingsIn: number[],
        locationIn: string,
        timeIn: number,
        descriptionIn: string,
        featuresIn: string[],
        musicIn: Music[],
        podcastsIn: Podcast[],
        audiobooksIn: Audiobook[],
        id?: string
    ) {
        this.path = path
        this.length = lengthIn
        this.difficulty = difficultyIn
        this.ratings = ratingsIn
        this.location = locationIn
        this.time = timeIn
        this.description = descriptionIn
        this.features = featuresIn
        this.music = musicIn;
        this.podcasts = podcastsIn;
        this.audiobooks = audiobooksIn;
        this.id = id
    }

}