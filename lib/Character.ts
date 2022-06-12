import type { VN } from "./VN";

export class Character {
    name: string
    vn: VN

    constructor(name: string, vn: VN) {
        this.name = name
        this.vn = vn
    }

    say(text: string) {
        
    }
}