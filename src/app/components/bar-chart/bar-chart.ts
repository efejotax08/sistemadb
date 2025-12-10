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
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})




export class BarChart implements OnChanges {

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
          name: 'Ventas',
          data: [], // lo llenamos luego con la API
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      dataLabels: {
        enabled: false
      },
      
      title: {
        text: 'Ventas por periodo de tiempo'
      },
    };

    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.kpiService.getVentasDiarias(this.desde,this.hasta,this.ciudad).subscribe({
      next: (rows) => {
        // rows: [{ fecha: '2025-12-01', total: 1500 }, ...]
        const categorias = rows.map((r: any) => r.fecha);
        const valores = rows.map((r: any) => r.totalVentas);

        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: categorias,
          },
          series: [
            {
              name: 'Ventas',
              data: valores,
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
