import { ProjectMandate } from "../enums/work.enum"

export interface Project {
    thumbnail: string,
    name: string,
    type: ProjectTypes,
    intro: string,
    description: string,
    impact: string[],
    links: ProjectLinks,
    techstack: ProjectTechstack[]
}

interface ProjectLinks {
    repo: string,
    demo?: string,
    live?: string
}

interface ProjectTypes {
    stack: string,
    mandate: ProjectMandate
}

interface ProjectTechstack {
    icon: string,
    link: string
}