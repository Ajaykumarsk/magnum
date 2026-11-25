import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse, TableQueryParams } from '../../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl;

    getList<T>(endpoint: string, params?: TableQueryParams): Observable<PaginatedResponse<T>> {
        let httpParams = new HttpParams();

        if (params) {
            Object.keys(params).forEach((key) => {
                const value = params[key];
                if (value !== null && value !== undefined && value !== '') {
                    httpParams = httpParams.set(key, value.toString());
                }
            });
        }

        return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${endpoint}/`, { params: httpParams });
    }

    getById<T>(endpoint: string, id: string | number): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    create<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}/`, data);
    }

    update<T>(endpoint: string, id: string | number, data: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}/`, data);
    }

    patch<T>(endpoint: string, id: string | number, data: any): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${endpoint}/${id}/`, data);
    }

    delete(endpoint: string, id: string | number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${endpoint}/${id}/`);
    }

    buildTableParams(event: any, additionalFilters?: { [key: string]: any }): TableQueryParams {
        const params: TableQueryParams = {};

        if (event.first !== undefined && event.rows) {
            params.page = Math.floor(event.first / event.rows) + 1;
            params.page_size = event.rows;
        }

        if (event.sortField) {
            const sortOrder = event.sortOrder === -1 ? '-' : '';
            params.ordering = `${sortOrder}${event.sortField}`;
        }

        if (event.globalFilter) {
            params.search = event.globalFilter;
        }

        if (event.filters) {
            Object.keys(event.filters).forEach((key) => {
                const filter = event.filters[key];
                if (filter.value !== null && filter.value !== undefined && filter.value !== '') {
                    params[key] = filter.value;
                }
            });
        }

        if (additionalFilters) {
            Object.assign(params, additionalFilters);
        }

        return params;
    }
}