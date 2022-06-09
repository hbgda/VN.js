import fs = require("fs")

export class TextBox implements Component {
    html: string
    style: string

    constructor(parent: HTMLElement) {
        this.html = fs.readFileSync("source.html").toString()
        this.style = fs.readFileSync("style.css").toString()

        if(document.getElementById("textbox_style") != undefined)
            return

        const styleElement = document.createElement("style")
        styleElement.id = "textbox_style"
        styleElement.append(this.style)
        document.head.appendChild(styleElement)
    }
}
