import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class CollectorService {
    constructor(private http: HttpClient) {}

    login(id, password) {
        return this.http.post<any>(`${environment.base_url}/collector/login`, {
            id,
            password,
        });
    }

    fetchReports(id) {
        return this.http.get<any>(`${environment.base_url}/collector/reports/today/${id}`);
    }

    postReport(data) {
        return this.http.post<any>(`${environment.base_url}/collector/report`, data);
    }
}
