interface SceneInitOptions {
    height: number,
    width: number,
    backgroundColor?: string
}

interface LoadedPathData {
    scene: string,
    characterText: Array<{name: string, text: string}>
}