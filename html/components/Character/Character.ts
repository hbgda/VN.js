import { Component } from "../../../lib/Component"
import path = require("path")

export class Character extends Component {
    characterName: string
    currentImageState: string

    imageElement: HTMLImageElement

    visible: boolean = false

    constructor(name: string, parent: HTMLElement) {
        super("Character", "character_component", parent)
        this.characterName = name
        this.imageElement = this.element.querySelector("img")
        this.element.id = "char_" + name
        this.setVisible(false)
    }

    setState(state: string) {
        this.imageElement.src = state
    }

    setVisible(visible: boolean) {
        this.visible = visible
        this.element.style.display = visible ? "block" : "none"
    }
}