import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import axios from "axios";
import { Contribution, ContributionByYear, ContributionResponse, CustomContributionData, ExtendedContributionData } from "../interfaces/github.api.interface";

@Injectable({
    providedIn: 'root'
})
export class GitHubApiService {

    private readonly domain = environment.API_CONTRIBUTION_URL.trim();

    async getContributionData(): Promise<ExtendedContributionData> {
        const response = await axios.get<ContributionResponse>(this.domain);
        return this.mapContributionData(response.data);
    }

    mapContributionData(data: ContributionResponse): ExtendedContributionData {
        const editedData: CustomContributionData = this.mapCustomizedContributions(data);
        return {
            numByYear: data.total,
            raw: data.contributions,
            ...editedData
        };
    }

    mapCustomizedContributions(data: ContributionResponse): CustomContributionData {
        const annualData: ContributionByYear[] = [];
        const source: Contribution[] = data.contributions;
        Object.keys(data.total).reverse().forEach((year: string) => {
            const annualContributions: Contribution[] = [];
            let annualTotal = 0;

            while(source.length > 0) {
                const currYear = new Date(`${source[0].date}T00:00`).getFullYear();
                const compareYear = Number(year);

                if (currYear !== compareYear) {
                    break;
                }

                // Collect all contributions of looped year
                annualContributions.push(source[0]);
                annualTotal += source[0].count;

                // Shorten list of contributions to start loop with new year on respective data.
                source.splice(0, 1);
            }
            annualData.push({ year: Number(year), data: annualContributions, total: annualTotal });
        })
        return { annual: annualData };
    }
}