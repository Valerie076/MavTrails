export class Music {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getDetails(): string {
        return ID: ${this.id}, Name: ${this.name};
    }
}
