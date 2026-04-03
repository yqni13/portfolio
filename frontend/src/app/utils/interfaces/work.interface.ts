export interface Project {
    thumbnail: string,
    name: string,
    type: string,
    intro: string,
    description: string,
    impact: string[],
    links: ProjectLinks,
    techstack: string[]
}

interface ProjectLinks {
    repo: string,
    demo?: string,
    live?: string
}