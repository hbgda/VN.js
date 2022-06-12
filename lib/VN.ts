import { app, BrowserWindow } from "electron";
import path = require("path")

import { Character } from "./Character";

export class VN {
    electronInstance: BrowserWindow
    height: number
    width: number
    backgroundColor: string

    constructor(opts: SceneInitOptions) {
        this.height = opts.height
        this.width = opts.width
        this.backgroundColor = opts.backgroundColor || "white"
    }

    async init() {
        await app.whenReady().then(() => {
            const win = new BrowserWindow({
                height: this.height,
                width: this.width,
                frame: false,
                backgroundColor: this.backgroundColor,
                resizable: false,
                webPreferences: {
                    preload: path.join(__dirname, "electron", "preload.js"),
                    devTools: true
                }
            })
            win.setTitle("VN.js")
            win.loadFile("html/pages/Menu/menu.html")
            this.electronInstance = win
        })
    }

    async setBaseProperties(opts: SceneInitOptions, animate: boolean = false) {
        this.electronInstance.setBackgroundColor(opts.backgroundColor || this.backgroundColor)
        this.electronInstance.setSize(opts.width, opts.height, animate)
    }

    async setScreenPosition(x: number, y: number, animate = false) {
        this.electronInstance.setPosition(x, y, animate)
    }

    createCharacter(name: string) {
        return new Character(name, this)
    }
}