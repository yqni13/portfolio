import { Component, computed, inject, input } from "@angular/core";
import { Contribution, ExtendedContributionData } from "../../../api/interfaces/github.api.interface";
import { CommonModule } from "@angular/common";
import { DateTimeService } from "../../../services/datetime.service";
import { HeaderData } from "../../../utils/interfaces/contribution.interface";

@Component({
    selector: 'app-contribution',
    imports: [
        CommonModule
    ],
    templateUrl: './contribution.component.html',
    styleUrl: './contribution.component.scss'
})
export class ContributionComponent {

    readonly dt = inject(DateTimeService);

    readonly data = input.required<ExtendedContributionData>();
    readonly isLoaded = input(false);

    readonly weeks = computed<(Contribution | null)[][]>(() => this.computeWeeks());
    readonly rows = computed<(Contribution | null)[][]>(() => this.computeRows());
    readonly monthHeaders = computed<HeaderData[]>(() => this.computeMonthHeader());

    mapTooltipInfo(count: number, date: string): string {
        const ts = new Date(date);
        const day = ts.getDate();
        const month = this.dt.getMonthName(ts.getMonth());

        const suffixRules = [
            { day: 4, apply: () => 'th' },
            { day: 3, apply: () => 'rd' },
            { day: 2, apply: () => 'nd' },
            { day: 1, apply: () => 'st' }
        ];
        const textRules = [
            { count: 2, apply: () => `${count} contributions on ${month} ${day}${suffix}.` },
            { count: 1, apply: () => `${count} contribution on ${month} ${day}${suffix}.` },
            { count: 0, apply: () => `No contributions on ${month} ${day}${suffix}.` }
        ];

        const suffix = suffixRules.find(rule => day >= rule.day)?.apply();
        const text = textRules.find(rule => count >= rule.count)?.apply() ?? 'No contributions.';

        return text;
    }

    private computeWeeks(): (Contribution | null)[][] {
        const days = this.data().annual[0].data;
        if (!days.length) {
            return [];
        }

        // UTC returns Sunday == index 0 => change to Monday == index 0.
        const offset = (new Date(days[0].date).getUTCDay() + 6) % 7;
        const padded: (Contribution | null)[] = [...Array(offset).fill(null), ...days];

        const weeks: (Contribution | null)[][] = [];
        for (let i = 0; i < padded.length; i+= 7) {
            weeks.push(padded.slice(i, i + 7));
        }

        return weeks;
    }

    private computeRows(): (Contribution | null)[][] {
        return Array.from({ length: 7 }, (_, weekday) =>
            // Use null to fill last week (column).
            this.weeks().map(week => week[weekday] ?? null)
        );
    }

    private computeMonthHeader(): HeaderData[] {
        const result: HeaderData[] = [];
        for (const week of this.weeks()) {
            const firstDay = week.find(day => day !== null)!;
            const month = new Date(firstDay.date).getUTCMonth();
            const last = result.at(-1);
            if (last?.month === month) {
                last.colspan++;
            } else {
                result.push({ month, colspan: 1 });
            }
        }

        return result;
    }
}