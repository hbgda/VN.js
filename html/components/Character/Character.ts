import { Component } from "../../../lib/Component"
import path = require("path")

export class Character extends Component {
    characterName: string
    currentImageState: string

    imageElement: HTMLImageElement

    constructor(name: string, parent: HTMLElement) {
        super("Character", "character_component", parent)
        this.characterName = name
        this.imageElement = this.element.querySelector("img")
        this.element.id = "char_" + name
    }

    setState(state: string) {
        this.imageElement.src = state
    }
}