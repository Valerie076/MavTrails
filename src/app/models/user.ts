export class User {
    username: string = ""
    email: string = ""
    password: string = ""
    profilePicture: string = ""

    constructor(
        usernameIn: string,
        emailIn: string,
        passwordIn: string,
        profilePictureIn: string
    ) {
        this.username = usernameIn
        this.email = emailIn
        this.password = passwordIn
        this.profilePicture = profilePictureIn
    }
}