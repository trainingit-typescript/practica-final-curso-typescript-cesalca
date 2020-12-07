/* Aquí deberás crear la clase para instanciar cada una de las películas */
import * as moment from "moment";

import { Formato } from "./enum-formato";
import { Valoracion } from "./type-valoracion";

export class Pelicula {

  public formato: Formato;
  private fecha: moment.Moment;
  public valoracion: Valoracion;

  constructor(
    public id: number,
    public titulo: string,
    public director: string,
    fecha: string,
    public cartel: string,
    public vista: boolean,
    format: string,
    public oscars: number,
    valoracion: number,
  ) {
    this.fecha = moment(fecha, "DD-MM-YYYY");
    this.formato = Formato[format];
    this.valoracion = valoracion as Valoracion;
  }

  public getAnyo(): number {
    return this.fecha.year();
  }

  public esPosteriorA(p: Pelicula): boolean {
    return this.fecha.isAfter(p.fecha);
  }
}
