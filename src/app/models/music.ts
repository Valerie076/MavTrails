import { MusicType } from "../enums/music-type";

export class Music {
    id: string;
    name: string;
    artist: string;
    type: MusicType;

    constructor(id: string, name: string, artist: string, type: MusicType) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.type = type;
    }

    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Artist: ${this.artist}`;
    }
}
