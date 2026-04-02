export interface Skill {
    icon: string,
    name: string,
    link: string,
    customStyle?: boolean
}

export interface SkillCollection {
    title: string,
    skills: Skill[]
}