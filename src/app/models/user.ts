export class User {
    id: string = "" // The ID assigned by Firebase
    profilePicture: string = ""

    constructor(
        idIn: string,
        profilePictureIn: string
    ) {
        this.id = idIn;
        this.profilePicture = profilePictureIn
    }
}