import { Scene } from "../lib/Scene";

async function start() {
    const x = new Scene({
        height: 1080,
        width: 1920,
        backgroundColor: "red"
    })
    await x.init()
}
start()
