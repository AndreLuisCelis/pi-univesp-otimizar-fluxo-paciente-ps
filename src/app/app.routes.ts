import { Routes } from '@angular/router';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { HistoricoComponent } from './historico/historico.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: MonitoramentoComponent,
    },
    {
        path: 'historico',
        component: HistoricoComponent,
    },
];
