/* Aquí deberás crear la clase para el controlador de la vista, que será el que se comunique directamente con el HTML */
import { ControladorPeliculas } from "./controlador-peliculas";
import {Formato, Pelicula} from "./datos/pelicula";
import { DirectorPeliculas } from "./interface-director-peliculas";
export class VistaPeliculas {
  private HTML: any = {};

  constructor(private cPeliculas: ControladorPeliculas) {
    this.cargaHTML();
    this.pintaPeliculas(this.cPeliculas.getPeliculasVistas(true), this.HTML.vistas);
    this.pintaPeliculas(this.cPeliculas.getPeliculasVistas(false), this.HTML.pendientes);
    this.pintaNumPeliculas();
    this.pintaEstadistica(this.cPeliculas.getPeliculaMejorValorada(), this.HTML.peliculaValorada);
    this.pintaEstadistica(this.cPeliculas.getPeliculaConMasOscars(), this.HTML.peliculaOscars);
    this.pintaEstadistica(this.cPeliculas.getPeliculaMasReciente(), this.HTML.peliculaReciente);
    this.pintaDirectores(this.cPeliculas.getDirectoresYPeliculas());
  }
  private cargaHTML(): void {
    this.HTML.vistas = document.querySelector(".js-lista-vistas");
    this.HTML.numVistas = document.querySelector(".js-n-peliculas-vistas");
    this.HTML.pendientes = document.querySelector(".js-lista-pendientes");
    this.HTML.numPendientes = document.querySelector(".js-n-peliculas-pendientes");
    this.HTML.peliculaValorada = document.querySelector(".js-mejor-valorada");
    this.HTML.peliculaOscars = document.querySelector(".js-mas-oscars");
    this.HTML.peliculaReciente = document.querySelector(".js-mas-reciente");
    this.HTML.peliculaBase = document.querySelector(".js-pelicula-base");
    this.HTML.directores = document.querySelector(".js-mejor-valorada");
    this.HTML.directores = document.querySelector(".js-lista-directores");
    this.HTML.directorBase = document.querySelector(".js-director-base");
    this.HTML.peliculaDirectorBase = document.querySelector(".js-pelicula-director-base");
  }

  private pintaNumPeliculas() {
    this.HTML.numPendientes.textContent = this.cPeliculas.getNumPeliculas(false);
    this.HTML.numVistas.textContent = this.cPeliculas.getNumPeliculas(true);
  }
  private limpiarLista(wrapper: HTMLElement) {
    wrapper.querySelectorAll(".js-pelicula").forEach((item) => { item.remove(); });

  }
  private pintaPeliculas(peliculas: Pelicula[], wrapper: HTMLElement) {
    this.limpiarLista(wrapper);
    for (const pelicula of peliculas) {
      const item: HTMLElement = this.HTML.peliculaBase.cloneNode(true);
      item.querySelector(".js-titulo").textContent = pelicula.titulo;
      item.querySelector(".js-director").textContent = pelicula.director;
      item.querySelector(".js-anyo").textContent = pelicula.fecha.getFullYear().toString();

      const img: HTMLImageElement = item.querySelector(".js-cartel");
      img.src = pelicula.cartel;
      img.alt = pelicula.titulo;
      img.title = pelicula.titulo;

      if (pelicula.oscars === 0) {
        item.querySelector(".js-oscars").classList.add("hide");
      }
      item.querySelector(".js-formato-" + Formato[pelicula.formato].toLowerCase()).classList.remove("hide");

      item.querySelector(".js-valoracion").setAttribute("data-puntos", pelicula.valoracion.toString());
      for (let v = 1; v < 6; v++) {
        const li = item.querySelector(".js-valoracion-" + v.toString());
        if (v <= pelicula.valoracion) {
          li.classList.remove("glyphicon-star-empty");
          li.classList.add("glyphicon-star");
        } else {
          li.classList.add("glyphicon-star-empty");
          li.classList.remove("glyphicon-star");
        }
      }
      wrapper.appendChild(item);
    }
  }

  private pintaEstadistica(pelicula: Pelicula, wrapper: HTMLElement) {
    wrapper.querySelector(".js-titulo").textContent = pelicula.titulo;

    const img: HTMLImageElement = wrapper.querySelector(".js-cartel");
    img.src = pelicula.cartel;
    img.alt = pelicula.titulo;
    img.title = pelicula.titulo;
  }

  private pintaDirectores(directoresPeliculas: DirectorPeliculas[]) {
    (this.HTML.directores as HTMLUListElement).querySelectorAll("li").forEach((e) => { e.remove(); });
    for (const director of directoresPeliculas) {
      const directorElement: HTMLElement = this.HTML.directorBase.cloneNode(true);
      directorElement.querySelector(".js-director").textContent = director.nombre;
      const directoresPeliculasElement = directorElement.querySelector(".js-lista-peliculas-directores");
      directoresPeliculasElement.childNodes.forEach((e) => { e.remove(); });
      for (const p of director.peliculas) {
        const item: HTMLElement = this.HTML.peliculaDirectorBase.cloneNode(true);
        item.querySelector(".js-titulo").textContent = p.titulo;
        item.querySelector(".js-anyo").textContent = p.fecha.getFullYear().toString();
        directorElement.appendChild(item);
      }
      this.HTML.directores.appendChild(directorElement);
    }
  }
}
