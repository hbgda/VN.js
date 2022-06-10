import fs = require("fs")
import { Component } from '../../../lib/Component'

export class TextBox extends Component {
    html: string
    style: string

    name: string
    texts: string[]

    nameField: HTMLHeadingElement
    textField: HTMLParagraphElement

    addTextInterval: NodeJS.Timer
    addTextDelay: number = 50

    constructor(parent: HTMLElement) {
        super("TextBox", "textbox_component", parent)
        this.nameField = this.element.querySelector(".name")
        this.textField = this.element.querySelector(".text")
    }

    setText(name: string, texts: string[]) {
        this.name = name
        this.texts = texts

        this.nameField.textContent = this.name
        let textIndex = 0
        this.textField.textContent = ""
        this.addTextInterval = setInterval(() => {
            this.textField.textContent += this.texts[0][textIndex]
            textIndex++
            if (textIndex >= this.texts[0].length) {
                clearInterval(this.addTextInterval)
            }
        }, this.addTextDelay)
    }
}
