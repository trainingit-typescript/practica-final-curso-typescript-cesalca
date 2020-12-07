import { ControladorPeliculas } from "./controlador-peliculas";
import { PeliculaJSON } from "./interfaz-PeliculaJSON";
import * as dataJSON from "./peliculas.json";
import { VistaPeliculas } from "./vista-peliculas";

/* Éste es el archivo de entrada y el que arrancará tu aplicación, desde aquí instanciarás el controlador de películas y el controlador de la vista */
const cPeliculas = new ControladorPeliculas();
cPeliculas.cargarPeliculas(dataJSON.peliculas as PeliculaJSON[]);
const vPeliculas = new VistaPeliculas(cPeliculas);
