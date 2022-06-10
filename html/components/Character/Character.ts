import { Component } from "../../../lib/Component"
import path = require("path")

const BASE_ASSET_PATH: string = path.join(__dirname, "characters")
export class Character extends Component {
    characterName: string
    currentImageState: string
    assetPath: string

    imageElement: HTMLImageElement

    constructor(name: string, parent: HTMLElement) {
        super("Character", "character_component", parent)
        this.characterName = name
        this.assetPath = path.join(BASE_ASSET_PATH, this.characterName)
        this.imageElement = this.element.querySelector("img")
    }
}