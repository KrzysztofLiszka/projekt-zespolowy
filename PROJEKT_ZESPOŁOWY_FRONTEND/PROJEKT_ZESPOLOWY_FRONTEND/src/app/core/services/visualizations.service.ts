import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";


@Injectable({
    providedIn: 'root'
})
export class VisualizationsService extends BaseApiService {
    readonly CONTROLLER_NAME = "Visualization";

    getAllItems(): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}`);
    }

    getItemById(id: string): Observable<any> {
        return this.get<any>(`${this.CONTROLLER_NAME}/${id}`);
    }

    addItem(): Observable<any> {
        return this.post(`${this.CONTROLLER_NAME}/add`, '')
    }
    updateItem(item: any): Observable<any> {
        return this.put(`${this.CONTROLLER_NAME}/edit`, item)
    }

    deleteItem(id: string): Observable<any> {
        return this.delete(`${this.CONTROLLER_NAME}/${id}`)
    }

    addImage(visualizationId: string, imageFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', imageFile);
        return this.post(`${this.CONTROLLER_NAME}/AddImage/${visualizationId}`, formData);
    }

    deleteImage(imageId: string): Observable<any> {
        return this.delete(`${this.CONTROLLER_NAME}/DeleteImage/${imageId}`);
    }

    getImages(visualizationId: string): Observable<any[]> {
        return this.getAll<any>(`${this.CONTROLLER_NAME}/GetImages/${visualizationId}`);
    }
}
