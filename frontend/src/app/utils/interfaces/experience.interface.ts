export interface Experience {
    title: string,
    time: string,
    institute: Institute,
    type: string,
    core: string[],
    keys: string[]
}

interface Institute {
    name: string,
    link?: string
}