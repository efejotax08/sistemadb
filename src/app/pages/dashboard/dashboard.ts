import { Component, OnInit } from '@angular/core';
import { ChartLine } from '../../components/chart-line/chart-line';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { VentasDiarias } from '../../components/ventas-diarias/ventas-diarias';
import { BarChart } from '../../components/bar-chart/bar-chart';
import { KpiApiService } from '../../core/services/kpi-api.service';
import { ScatterChart } from '../../components/scatter-chart/scatter-chart';

@Component({
  selector: 'app-dashboard',
  imports: [ChartLine,VentasDiarias, FormsModule,BarChart,ScatterChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})


export class Dashboard implements OnInit {

desde:string="2025-01-01";
hasta:string="2027-01-01";

customer_count=0;
all_time_sales=0;
all_time_profit=0;
product_count=0;
constructor(private kpiService: KpiApiService) {}
ngOnInit(): void {
  this.cargarInfoGlobal();
}

cargarInfoGlobal(){
this.kpiService.getKpiGlobal().subscribe({
  next:(value:any)=> {
      this.customer_count=value.clientesConCompra;
      this.all_time_profit=value.totalGanancias;
      this.all_time_sales=value.totalVentas;
      this.product_count=value.productosDiferentes;
  },
  error: (err) => {
        console.error('Error cargando ventas diarias', err);
    
      },
});
}
}
