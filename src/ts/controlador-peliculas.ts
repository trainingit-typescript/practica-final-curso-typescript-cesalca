/* Aquí deberás crear la clase para el controlador de películas, que se encargará de extraer datos y realizar operaciones sobre el conjunto de las películas */
import { Pelicula } from "./datos/pelicula";
import { PeliculaJSON } from "./interfaz-PeliculaJSON";

export class ControladorPeliculas {

  private peliculas: Pelicula[] = [];

  private peliculasVistas: Pelicula[];
  private peliculasPendientes: Pelicula[];

  constructor() {
    // this.cargarPeliculas();
  }

  public cargarPeliculas(peliculas: PeliculaJSON[]): void {
    for (const data of peliculas) {
      this.peliculas.push(new Pelicula(
        data.id,
        data.titulo,
        data.director,
        data.fecha,
        data.cartel,
        data.vista,
        data.formato,
        data.oscars,
        data.valoracion,
      ));
    }
    this.peliculasVistas = this.filtrarPeliculasVistas(true);
    this.peliculasPendientes = this.filtrarPeliculasVistas(false);
  }

  private filtrarPeliculasVistas(vistas: boolean): Pelicula[] {
    return this.peliculas.filter( (pelicula) => pelicula.vista === vistas);
  }

  public getPeliculasVistas(vistas: boolean): Pelicula[] {
    return vistas ? this.peliculasVistas : this.peliculasPendientes;
  }

  public getNumPeliculas(vistas: boolean) {
    return this.getPeliculasVistas(vistas).length;
  }

  public getPeliculaMejorValorada(): Pelicula {
    return this.peliculas.reduce((acum, pelicula) => acum.valoracion > pelicula.valoracion ? acum : pelicula);
  }

  public getPeliculaConMasOscars(): Pelicula {
    return this.peliculas.reduce((acum, pelicula) => acum.oscars > pelicula.oscars ? acum : pelicula);
  }

  public getPeliculaMasReciente() {
    return this.peliculas.reduce((acum, pelicula) => acum.esPosteriorA(pelicula) ? acum : pelicula);
  }

  public getDirectores(): string[] {
    return this.peliculas.map((p) => p.director).filter((item, i, l) => l.indexOf(item) === i);
  }

  public getPeliculasDirector(director: string): Pelicula[] {
    return this.peliculas.filter((item) => item.director === director);
  }
}
