import { app, BrowserWindow } from "electron";
import path = require("path")

export class Scene {
    electronInstance: BrowserWindow
    height: number
    width: number
    backgroundColor: string

    constructor(opts: SceneInitOptions) {
        this.height = opts.height
        this.width = opts.width
        this.backgroundColor = opts.backgroundColor
    }

    async init() {
        await app.whenReady().then(() => {
            const win = new BrowserWindow({
                height: this.height,
                width: this.width,
                frame: false,
                backgroundColor: this.backgroundColor,
                webPreferences: {
                    preload: path.join(__dirname, "electron", "preload.js")
                }
            })
            win.setTitle("VN.js")
            this.electronInstance = win
        })
    }

    async setBaseProperties(opts: SceneInitOptions, animate: boolean = false) {
        this.electronInstance.setBackgroundColor(opts.backgroundColor)
        this.electronInstance.setSize(opts.width, opts.height, animate)
    }

    async setScreenPosition(x: number, y: number, animate = false) {
        this.electronInstance.setPosition(x, y, animate)
    }
}