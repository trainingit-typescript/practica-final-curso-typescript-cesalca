/* Aquí deberás crear la clase para instanciar cada una de las películas */
import * as moment from "moment";
export enum Formato {
  DVD,
  archivo,
  VHS,
}
export class Pelicula {

  public formato: Formato;
  public fecha: Date;
  constructor(
    public id: number,
    public titulo: string,
    public director: string,
    fecha: string,
    public cartel: string,
    public vista: boolean,
    format: string,
    public oscars: number,
    public valoracion: number,
  ) {
    this.fecha = moment(fecha, "DD-MM-YYYY").toDate();
    this.formato = Formato[format];

  }
}
