import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComplianceService {
    private http = inject(HttpClient);
    private baseUrl = 'http://192.168.29.63:8000/api/v1/masters/resource/compliance';

    getChecklists(params: any = {}): Observable<any> {
        return this.http.get(`${this.baseUrl}/`, { params });
    }

    getStats(): Observable<any> {
        return this.http.get(`${this.baseUrl}/dashboard-stats/`);
    }

    getDocumentTypes(): Observable<any> {
        return this.http.get(`${this.baseUrl}/document-types/`);
    }

    getStatusChoices(): Observable<any> {
        return this.http.get(`${this.baseUrl}/status-choices/`);
    }

    createChecklist(formData: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/`, formData);
    }

    updateChecklist(id: number | string, formData: FormData): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}/`, formData);
    }

    deleteChecklist(id: number | string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}/`);
    }

    renewChecklist(id: number | string, formData: FormData): Observable<any> {
        return this.http.post(`${this.baseUrl}/${id}/renew/`, formData);
    }

    bulkDelete(ids: (number | string)[]): Observable<any> {
        return this.http.post(`${this.baseUrl}/bulk-delete/`, { ids });
    }

    exportCsv(): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/export-csv/`, { responseType: 'blob' });
    }
}