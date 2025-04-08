import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface infoHistoricoAtendiementos {
  tipoAtendimento: string;
  totalAtendimentos: number;
  tempoMedioEspera: string;
  tempoMedioAtendimento: string;
}

const ATENDIMENTO_DATA: infoHistoricoAtendiementos[] = [
  { tipoAtendimento: 'Clínica', totalAtendimentos: 100, tempoMedioEspera: '5 min', tempoMedioAtendimento: '15 min' },
  { tipoAtendimento: 'Pediatria', totalAtendimentos: 20, tempoMedioEspera: '10 min', tempoMedioAtendimento: '20 min' },
  { tipoAtendimento: 'Ortopedia', totalAtendimentos: 30, tempoMedioEspera: '15 min', tempoMedioAtendimento: '25 min' },
  { tipoAtendimento: 'Emergência', totalAtendimentos: 30, tempoMedioEspera: '15 min', tempoMedioAtendimento: '25 min' },
];

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  data: { tipo: string; displayedColumns: string[]; dataSource: infoHistoricoAtendiementos[] }[] = [];
  displayedColumns: string[] = ['tipoAtendimento', 'totalAtendimentos', 'tempoMedioEspera', 'tempoMedioAtendimento',];
  dataSource = ATENDIMENTO_DATA;

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.data.push(
      {
        tipo: 'Diario',
        displayedColumns: this.displayedColumns,
        dataSource: this.gerarDataSource(this.dataSource, 1)
      },
      {
        tipo: 'Semanal',
        displayedColumns: this.displayedColumns,
        dataSource: this.gerarDataSource(this.dataSource, 7)
      },
      {
        tipo: 'Mensal',
        displayedColumns: this.displayedColumns,
        dataSource: this.gerarDataSource(this.dataSource, 30)
      },
    )
  }

  gerarDataSource( dataSource:infoHistoricoAtendiementos[], x: number){
    let copyDataSource = JSON.parse(JSON.stringify(dataSource)); // Faz uma cópia profunda do array
    copyDataSource = copyDataSource.map((item: any) => {
      item.tempoMedioAtendimento = this.substituirNumeroTempoPorAleatorio(item.tempoMedioAtendimento);
      item.tempoMedioEspera = this.substituirNumeroTempoPorAleatorio(item.tempoMedioEspera);
      item.totalAtendimentos = x * item.totalAtendimentos;
      return item;
    })
    return copyDataSource;
  }

  substituirNumeroTempoPorAleatorio(str: string): string {
    const numeroAtual = str.match(/\d+/)?.[0]; // Ex: "7" em "7 min"
    if (!numeroAtual) return str; // Se não houver número, retorna original
    const novoNumero = Math.floor(Math.random() * 60) + 1;
    return str.replace(numeroAtual, novoNumero.toString());
  }
}
