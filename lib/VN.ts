import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import path = require("path")
import fs = require("fs")

import { Character } from "./Character";
import { createChoiceEvent, createSceneImageEvent } from "./Event";

export class VN {
    _init: boolean = false

    electronInstance: BrowserWindow
    height: number
    width: number
    backgroundColor: string

    characters: {[key: string]: Character} = {}
    pathData: {[key: string]: {run: PathFunction}} = {}

    loadedPathData: SceneEvent[]
    branchingPaths: {[key: string]: PathFunction} = {}

    assetPath: string

    pathDataHandler: PathDataHandler = {
        characters: {},
        setScene: (scene: string): void => {
            this.loadedPathData.push(createSceneImageEvent(`${this.assetPath}/scenes/${scene}.jpg`))
        },
        declareBranch: (id: string, path: PathFunction): void => {
            this.branchingPaths[id] = path
        },
        choice: (prompt: string, options: ChoiceOption[]): void => {
            this.loadedPathData.push(createChoiceEvent(prompt, options))
        },
        prompt: (prompt: string): void => {
            throw new Error("Function not implemented.");
        }
    }

    constructor(opts: SceneInitOptions, assetPath: string = path.join(__dirname, "assets")) {
        this.height = opts.height
        this.width = opts.width
        this.backgroundColor = opts.backgroundColor || "white"
        this.assetPath = assetPath
    }

    async init() {

        if(this._init) 
            return console.error("VN already initialised.")

        this._init = true
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

        ipcMain.on("load-path", (event, arg) => this.loadPath(event, arg))
        ipcMain.on("load-branch", (event, arg) => this.loadBranch(event, arg))
    }

    private loadBranch(event: IpcMainEvent, branchId: string) {
        let branch = this.branchingPaths[branchId]
        if(branch) {
            this.loadedPathData = []
            this.branchingPaths = {}
            
            branch(this.pathDataHandler)
            event.returnValue = this.loadedPathData
        }
        else {
            event.returnValue = "Invalid branch."
        }
    }

    private loadPath(event: IpcMainEvent, pathName: string) {
        if (this.pathData[pathName]) {
            this.loadedPathData = []

            this.pathData[pathName].run(this.pathDataHandler)
            event.returnValue = this.loadedPathData
        }
        else {
            event.returnValue = "Invalid path."
        }
    }

    loadPaths(source: string = path.join(__dirname, "../paths")) {
        fs.readdirSync(source).filter(
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

        if(this._init)
            return console.error("Cannot create characters when VN is initialised.")

        this.characters[name] = new Character(name, this)
        this.pathDataHandler.characters[name] = this.characters[name]
        return this.characters[name]
    }
}