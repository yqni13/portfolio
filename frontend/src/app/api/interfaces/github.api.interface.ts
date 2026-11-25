export interface ContributionResponse {
    total: Record<string, number>,
    contributions: Contribution[]
}

export interface Contribution {
    date: string,
    count: number,
    level: number
}

export interface ContributionByYear {
    year: number,
    data: Contribution[]
    total: number
}

export interface ContributionStreak {
    length: number,
    start: string,
    end: string
}

export interface CustomContributionData {
    annual: ContributionByYear[],
    // streakMax: ContributionStreak,
    // streakCurr: ContributionStreak
}

export interface ExtendedContributionData extends CustomContributionData {
    numByYear: Record<string, number>,
    raw: Contribution[]
}