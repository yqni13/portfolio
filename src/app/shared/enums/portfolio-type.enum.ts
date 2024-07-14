import { KeyValue } from "@angular/common";

export const PortfolioTypeEnum: KeyValue<number, string>[] = [
    { key: 0, value: 'all' },
    { key: 1, value: 'frontend' },
    { key: 2, value: 'fullstack' },
    { key: 3, value: 'module' }
]

export type PortfolioType = 'all' | 'frontend' | 'fullstack' | 'module';

export const PortfolioType = {
    all: 'all' as PortfolioType,
    frontend: 'frontend' as PortfolioType,
    fullstack: 'fullstack' as PortfolioType,
    module: 'module' as PortfolioType
};