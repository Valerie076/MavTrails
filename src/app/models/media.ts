import { MediaType } from "../enums/media-type";

export class Media {
    id?: string;
    uid: string;
    name: string;
    creator: string;
    type: MediaType;
    description: string;

    constructor(uid: string, name: string, creator: string, type: MediaType, description: string, id?: string) {
        this.id = id;
        this.uid = uid;
        this.name = name;
        this.creator = creator;
        this.description = description;
        this.type = type;
    }

    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Creator: ${this.creator}`;
    }
}
