import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajusta estos modelos según tus APIs reales
export interface KpiResumen {
  totalVentas: number;
  totalTransacciones:number;
  clientesUnicos: number;
  ticketPromedio: number;
  // agrega más campos si tu API los devuelve
}
export interface KpiGlobal {
  clientes_con_compra: number;
  total_ganancias:number;
  total_ventas: number;
  total_productos_diferentes: number;
  // agrega más campos si tu API los devuelve
}



export interface PuntoSerie {
  fecha: string;    // '2025-12-09'
  totalVentas: number;    // ventas, ingresos, etc.
  unidades:number;
}

export interface PuntoClima {
  fecha: string;
  ciudad: string;
  temperatura: number;
  humedad: number;
  precipitacion: number;
}

@Injectable({
  providedIn: 'root'
})
export class KpiApiService {

  // Cambia la URL base si es distinta
  private readonly baseUrl = 'https://dwbackend-e62a25deea2f.herokuapp.com/api/analytics';

  constructor(private http: HttpClient) {}


getKpiGlobal(): Observable<KpiGlobal>{
return this.http.get<KpiGlobal>(`${this.baseUrl}/kpis-globales`);
}

  // --- KPIs ---
getKpiResumen(desde: string, hasta: string, ciudad? : string): Observable<KpiResumen> {
  let params = new HttpParams()
    .set('desde', desde)
    .set('hasta', hasta);

  // Solo agregar el parámetro 'ciudad' si está presente
  if (ciudad) {
    params = params.set('ciudad', ciudad);
  }
return this.http.get<KpiResumen>(`${this.baseUrl}/kpis`, { params });

}


  // --- Series temporales de ventas ---
  getVentasDiarias(desde: string, hasta:string, ciudad?:string): Observable<PuntoSerie[]> {

     let params = new HttpParams()
    .set('desde', desde)
    .set('hasta', hasta);

  // Solo agregar el parámetro 'ciudad' si está presente
  if (ciudad) {
    params = params.set('ciudad', ciudad);
  }
  return this.http.get<PuntoSerie[]>(`${this.baseUrl}/series/ventas`, { params });
      
    
  }

  // --- Series temporales de clima ---
  getClimaDiario(desde:string,hasta:string,ciudad?:string): Observable<PuntoClima[]> {
  
let params = new HttpParams()
    .set('desde', desde)  // Parametro desde
    .set('hasta', hasta); // Parametro hasta

if (ciudad) {
    params = params.set('ciudad', ciudad);
  }

  // Realizar la solicitud GET enviando los parámetros
  return this.http.get<PuntoClima[]>(`${this.baseUrl}/series/clima`, { params });

  }
}
