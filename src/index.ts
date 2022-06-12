import { VN } from "../lib/VN";

async function start() {
    const vn = new VN({
        height: 720,
        width: 1280,
        backgroundColor: "white"
    })


    await vn.init()
}
start()
