import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.model";


@Injectable({providedIn: "root"})
export class ApiService {

    private base = environment.TMDB_BASE_URL;

    constructor(private http: HttpClient)
    {

    }

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.base}/movies`);
    }

    login(username: string, password: string ): Observable<{ token: string }>
    {
        return this.http.post<{ token: string }>(`${this.base}/Auth/register`, {
            username,
            password
        });
    }

}