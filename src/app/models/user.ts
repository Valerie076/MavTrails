export class User {
    id: string = "" // The ID assigned by Firebase
    username: string = ""
    profilePicture: string = ""

    constructor(
        idIn: string,
        usernameIn: string,
        profilePictureIn: string
    ) {
        this.id = idIn;
        this.username = usernameIn;
        this.profilePicture = profilePictureIn
    }
}