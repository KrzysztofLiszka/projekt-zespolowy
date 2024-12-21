import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api.service";

@Injectable({
    providedIn: 'root'
})
export class FileService extends BaseApiService {
    readonly CONTROLLER_NAME = "Files";

    //TO CHANGE

}
