export interface Experience {
    title: string,
    time: string,
    certificate: boolean,
    institute: Institute,
    type: string,
    core: string[],
    keys: string[]
}

interface Institute {
    name: string,
    link?: string
}