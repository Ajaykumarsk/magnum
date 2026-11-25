import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterDataService {
    private http = inject(HttpClient);
    private baseUrl = 'http://192.168.29.63:8000/api/v1';

    getItems(endpoint: string, params: any = {}): Observable<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}/`, { params });
    }

    getItem(endpoint: string, id: number | string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    createItem(endpoint: string, data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/${endpoint}/`, data);
    }

    updateItem(endpoint: string, id: number | string, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${endpoint}/${id}/`, data);
    }

    deleteItem(endpoint: string, id: number | string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    bulkDelete(endpoint: string, ids: (number | string)[]): Observable<any> {
        return this.http.post(`${this.baseUrl}/${endpoint}/bulk-delete/`, { ids });
    }

    exportCsv(endpoint: string): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/${endpoint}/export-csv/`, { responseType: 'blob' });
    }
}