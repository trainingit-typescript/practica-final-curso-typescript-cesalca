/* Aquí deberás crear la clase para el controlador de la vista, que será el que se comunique directamente con el HTML */
import { ControladorPeliculas } from "./controlador-peliculas";
import { Formato } from "./datos/enum-formato";
import { Pelicula } from "./datos/pelicula";
import { Valoracion } from "./datos/type-valoracion";
export class VistaPeliculas {
  // private HTML: any = {};

  /**
   * Esencialmente this.htmlVistas es equivalente a this.HTML.vistas
   * pero esta forma, aunque un poco más engorrosa, me restringe el tipado
   * de los objetos.
   */
  private htmlVistas: HTMLElement;
  private htmlNumVistas: HTMLElement;
  private htmlPendientes: HTMLElement;
  private htmlNumPendientes: HTMLElement;
  private htmlPeliculaValorada: HTMLElement;
  private htmlPeliculaOscars: HTMLElement;
  private htmlPeliculaReciente: HTMLElement;
  private htmlPeliculaBase: HTMLElement;
  private htmlDirectores: HTMLElement;
  private htmlDirectorBase: HTMLElement;
  private htmlPeliculaDirectorBase: HTMLElement;

  constructor(private cPeliculas: ControladorPeliculas) {
    this.cargaHTML();
    this.pintaPeliculas(true);
    this.pintaPeliculas(false);
    this.pintaNumPeliculas();
    this.pintaEstadistica(this.cPeliculas.getPeliculaMejorValorada(), this.htmlPeliculaValorada);
    this.pintaEstadistica(this.cPeliculas.getPeliculaConMasOscars(), this.htmlPeliculaOscars);
    this.pintaEstadistica(this.cPeliculas.getPeliculaMasReciente(), this.htmlPeliculaReciente);
    this.pintaDirectores();
  }

  private cargaHTML(): void {
    this.htmlVistas = document.querySelector(".js-lista-vistas");
    this.htmlNumVistas = document.querySelector(".js-n-peliculas-vistas");
    this.htmlPendientes = document.querySelector(".js-lista-pendientes");
    this.htmlNumPendientes = document.querySelector(".js-n-peliculas-pendientes");
    this.htmlPeliculaValorada = document.querySelector(".js-mejor-valorada");
    this.htmlPeliculaOscars = document.querySelector(".js-mas-oscars");
    this.htmlPeliculaReciente = document.querySelector(".js-mas-reciente");
    this.htmlPeliculaBase = document.querySelector(".js-pelicula-base");
    this.htmlDirectores = document.querySelector(".js-lista-directores");
    this.htmlDirectorBase = document.querySelector(".js-director-base");
    this.htmlPeliculaDirectorBase = document.querySelector(".js-pelicula-director-base");
  }

  private pintaNumPeliculas() {
    this.htmlNumPendientes.textContent = this.cPeliculas.getNumPeliculas(false).toString();
    this.htmlNumVistas.textContent = this.cPeliculas.getNumPeliculas(true).toString();
  }

  private limpiarListaPeliculas(vistas: boolean) {
    const wrapper: HTMLElement = (vistas ? this.htmlVistas : this.htmlPendientes);
    wrapper.querySelectorAll(".js-pelicula").forEach((item) => { item.remove(); });
  }

  private pintaPeliculas(vistas: boolean) {
    const peliculas = this.cPeliculas.getPeliculasVistas(vistas);
    const wrapper = (vistas ? this.htmlVistas : this.htmlPendientes);

    this.limpiarListaPeliculas(vistas);
    for (const pelicula of peliculas) {
      const item: HTMLElement = this.htmlPeliculaBase.cloneNode(true) as HTMLElement;
      item.querySelector(".js-titulo").textContent = pelicula.titulo;
      item.querySelector(".js-director").textContent = pelicula.director;
      item.querySelector(".js-anyo").textContent = pelicula.getAnyo().toString();

      const img: HTMLImageElement = item.querySelector(".js-cartel");
      img.src = pelicula.cartel;
      img.alt = pelicula.titulo;
      img.title = pelicula.titulo;

      if (pelicula.oscars === 0) {
        item.querySelector(".js-oscars").remove();
      }
      item.querySelector(".js-formato-" + Formato[pelicula.formato].toLowerCase()).classList.remove("hide");

      item.querySelector<HTMLElement>(".js-valoracion").dataset.puntos = vistas ? pelicula.valoracion.toString() : "";

      // Las no vistas tienen valoracion 0, con lo que siempre se asigna glyphicon-star-empty
      for (let v: Valoracion = 1; v < 6; v++) {
        const li = item.querySelector<HTMLElement>(".js-valoracion-" + v.toString());
        li.classList.remove("glyphicon-star-empty");
        li.classList.remove("glyphicon-star");
        li.classList.add(v <= pelicula.valoracion ? "glyphicon-star" : "glyphicon-star-empty");
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

  private pintaDirectores() {
    // Limpiamos los contenidos
    this.htmlDirectores.querySelectorAll("li").forEach((e) => { e.remove(); });
    for (const director of this.cPeliculas.getDirectores()) {
      const directorElement: HTMLElement = this.htmlDirectorBase.cloneNode(true) as HTMLElement;
      directorElement.querySelector(".js-director").textContent = director;
      const directoresPeliculasElement = directorElement.querySelector(".js-lista-peliculas-directores");
      // Limpiamos los contenidos
      directoresPeliculasElement.childNodes.forEach((e) => { e.remove(); });
      for (const p of this.cPeliculas.getPeliculasDirector(director)) {
        const item: HTMLElement = this.htmlPeliculaDirectorBase.cloneNode(true) as HTMLElement;
        item.querySelector(".js-titulo").textContent = p.titulo;
        item.querySelector(".js-anyo").textContent = p.getAnyo().toString();
        directoresPeliculasElement.appendChild(item);
      }

      this.htmlDirectores.appendChild(directorElement);
    }
  }
}
