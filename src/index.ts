import { Scene } from "../lib/Scene";

async function start() {
    const x = new Scene({
        height: 720,
        width: 1280,
        backgroundColor: "black"
    })
    await x.init()
    await new Promise((resolve, reject) => setTimeout(resolve, 5000))
    await x.setBaseProperties({
        height: 300,
        width: 1000,
        backgroundColor: "white"
    })
    await x.setScreenPosition(200, 400)
}
start()
