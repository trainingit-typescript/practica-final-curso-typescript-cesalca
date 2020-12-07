/* Aquí deberás crear la clase para el controlador de películas, que se encargará de extraer datos y realizar operaciones sobre el conjunto de las películas */
import { Formato, Pelicula } from "./datos/pelicula";
import { DirectorPeliculas } from "./interface-director-peliculas";
import * as dataJSON from "./peliculas.json";

export class ControladorPeliculas {

  private peliculas: Pelicula[] = [];

  constructor() {
    this.cargarPeliculas();
  }

  private cargarPeliculas(): void {
    for (const data of dataJSON.peliculas) {
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
  }

  public getPeliculasVistas(vistas: boolean): Pelicula[] {
    return this.peliculas.filter( (pelicula) => pelicula.vista === vistas);
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
    return this.peliculas.reduce((acum, pelicula) => acum.fecha > pelicula.fecha ? acum : pelicula);
  }

  public getDirectoresYPeliculas(): DirectorPeliculas[] {
    const directores: DirectorPeliculas[] = this.peliculas.map(pelicula => {
      return {
        nombre: pelicula.director,
        peliculas: this.peliculas.filter((p) => p.director === pelicula.director),
      } as DirectorPeliculas;
    });
    // Puesto que peliculas se genera a partir de director, no es necesario compararlo
    return directores.filter((director, indice, listaDirectores) => listaDirectores.findIndex(item => item.nombre === director.nombre) === indice);
  }
}
