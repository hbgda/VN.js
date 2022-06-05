import { app, BrowserWindow } from "electron";

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
            })
            win.setTitle("VN.js")
            this.electronInstance = win
        })
    }
}