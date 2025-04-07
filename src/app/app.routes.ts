import { Routes } from '@angular/router';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { HistoricoComponent } from './historico/historico.component';


export const routes: Routes = [
    {
        path: '', 
        component: MonitoramentoComponent,
    },
    {
        path: 'historico',
        component: HistoricoComponent,
    }
   
];
