import { Scene } from "../lib/Scene";

async function start() {
    const x = new Scene({
        height: 720,
        width: 1280,
        backgroundColor: "white"
    })
    await x.init()
}
start()
