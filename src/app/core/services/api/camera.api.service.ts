import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Camera } from "../models/camera.model";

@Injectable({
    providedIn: 'root'
})
export class CameraApiService {
    private apiUrl = 'https://localhost:7293/api/cameras';

    constructor(private http: HttpClient){}

    getCameras(): Observable<Camera[]> {
        return this.http.get<Camera[]>(this.apiUrl);
    }
}