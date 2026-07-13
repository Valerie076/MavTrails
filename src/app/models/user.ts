export class User {
    username: string = ""
    email: string = ""
    password: string = ""

    constructor(usernameIn: string, emailIn: string, passwordIn: string) {
        this.username = usernameIn
        this.email = emailIn
        this.password = passwordIn
    }
}