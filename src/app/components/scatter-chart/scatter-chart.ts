import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,  
  NgApexchartsModule} from 'ng-apexcharts'
  import { KpiApiService } from '../../core/services/kpi-api.service';
import { CommonModule } from '@angular/common';
export type VentasDiariasChartOptions = {
   series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-scatter-chart',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './scatter-chart.html',
  styleUrl: './scatter-chart.scss',
})




export class ScatterChart implements OnChanges {

 @Input() desde!: string;   // obligatorio
  @Input() hasta!: string;      // obligatorio
  @Input() ciudad?: string;        // opcional

chartOptions!: VentasDiariasChartOptions;
  loading = true;

  constructor(private kpiService: KpiApiService) {}
  

  ngOnChanges(changes: SimpleChanges): void {
    // Validación mínima
    if (!this.desde || !this.hasta) {
      console.error("fechaInicio y fechaFin son obligatorios");
      return;
    }

    this.chartOptions = {
      series: [
        {
          name: 'Humedad vs Temperatura',
          data: [], // lo llenamos luego con la API
        },
      ],
      chart: {
        type: 'scatter',
        height: 350,
        
      },
      xaxis: {
        title: {
            text: 'Temperatura'
        },
        type: 'category',
        categories: [],
      },
      dataLabels: {
        enabled: true
      },
      
      title: {
        text: 'Temperaturas registradas .'
      },
    };

    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.kpiService.getClimaDiario(this.desde,this.hasta,this.ciudad).subscribe({
      next: (rows) => {
        // rows: [{ fecha: '2025-12-01', total: 1500 }, ...]
        const fechas = rows.map((r: any) => r.fecha);
        const temp = rows.map((r: any) => r.temperatura);
        const hum = rows.map((r: any) => r.humedad);

        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: fechas,
          },
          series: [
            {
              name: 'Ventas',
              data: temp,
            },
          ],
        };

        this.loading = false;
      },


      error: (err) => {
        console.error('Error cargando ventas diarias', err);
        this.loading = false;
      },
    });
  }

}
