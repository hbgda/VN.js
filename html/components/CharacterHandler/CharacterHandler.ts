import { Component } from "../../../lib/Component"
import { Character } from "../Character/Character"

export class CharacterHandler extends Component {
    assetPath: string
    characters: {[key: string]: Character} = {}

    charDisplay: HTMLDivElement
    charContainer: HTMLDivElement
    shownCharacters: string[] = []

    constructor(characters: string[], assetPath: string, parent: HTMLElement) {
        console.log(characters)
        super("CharacterHandler", "characterhandler_component", parent)
        this.charDisplay = this.element.querySelector(".character-display")
        this.charContainer = this.element.querySelector(".character-container")
        
        this.assetPath = assetPath
        characters.forEach(e => {
            this.characters[e] = new Character(e, this.charContainer)
        })
    }

    showCharacter(charName: string, replace: boolean = true) {
        if (replace) {
            this.shownCharacters = []
            this.charDisplay.childNodes.forEach(c => {
                this.charContainer.appendChild(c)
                this.characters[charName].setVisible(false)
            })
        }
        this.shownCharacters.push(charName)
        this.characters[charName].setVisible(true)
        this.charDisplay.appendChild(this.characters[charName].element)
    }

    setCharacterPositions(chars: string[]) {

    }

    setCharacterState(charName: string, state: string) {
        this.characters[charName].setState(this.assetPath + `/characters/${charName}/${state}.png`)
    }
}