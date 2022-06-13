import { VN } from "../lib/VN";
import path = require("path")

async function start() {
    const vn = new VN({
        height: 720,
        width: 1280,
        backgroundColor: "white"
    }, path.join(__dirname, "../../assets"))

    vn.loadPaths()
    vn.createCharacter("test")

    await vn.init()
}
start()
