import type { VN } from "./VN";

export class Character {
    name: string
    vn: VN

    constructor(name: string, vn: VN) {
        this.name = name
        this.vn = vn
    }

    say(text: string, state: string = "neutral") {
        this.vn.loadedPathData.characterText.push({name: this.name, text, characterState: `${this.vn.assetPath}/characters/${this.name}/${state}.png`})
    }
}