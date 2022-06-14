import { app, BrowserWindow, ipcMain } from "electron";
import path = require("path")
import fs = require("fs")

import { Character } from "./Character";

export class VN {
    electronInstance: BrowserWindow
    height: number
    width: number
    backgroundColor: string

    characters: {[key: string]: Character} = {}
    pathData: {[key: string]: {run: Function}} = {}

    loadedPathData: LoadedPathData = {
        scene: "",
        characterText: []
    }

    assetPath: string

    constructor(opts: SceneInitOptions, assetPath: string = path.join(__dirname, "assets")) {
        this.height = opts.height
        this.width = opts.width
        this.backgroundColor = opts.backgroundColor || "white"
        this.assetPath = assetPath
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

        ipcMain.on("load-path", (event, pathName) => {
            //console.log(event, path)
            if (this.pathData[pathName]) {
                this.loadedPathData = {scene: this.loadedPathData.scene, characterText: []}
                this.pathData[pathName].run(this.characters, (scene: string) => {
                    this.loadedPathData.scene = path.join(this.assetPath, "scenes", scene + ".jpg")
                })
                event.reply("load-path-reply", this.loadedPathData)
            }
            else {
                event.reply("load-path-reply", "Invalid path.")
            }
        })
    }

    loadPaths(source: string = path.join(__dirname, "../paths")) {
        let paths = fs.readdirSync(source).filter(
            p => p.endsWith(".js")
        ).map(
            p => this.pathData[p.toLowerCase().slice(0, -3)] = {
                run: require(source + "/" + p).default
            }
        )
        //console.log(paths)
    }

    async setBaseProperties(opts: SceneInitOptions, animate: boolean = false) {
        this.electronInstance.setBackgroundColor(opts.backgroundColor || this.backgroundColor)
        this.electronInstance.setSize(opts.width, opts.height, animate)
    }

    async setScreenPosition(x: number, y: number, animate = false) {
        this.electronInstance.setPosition(x, y, animate)
    }

    createCharacter(name: string) {
        this.characters[name] = new Character(name, this)
        return this.characters[name]
    }
}