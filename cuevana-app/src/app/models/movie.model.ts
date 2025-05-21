export class Movie {

    private movieId: number;

    constructor(movieId: number){
        this.movieId = movieId;
    }

    //Encapsulamiento

    // El get es para obtener el valor del atributo de clase
    public getMovieId(): number {
        return this.movieId;
    }

    // El set es para cambiar el atributo de clase
    public setMovieId(movieId: number): void {
        this.movieId = movieId;
    }
}
