import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type LotType = 'UNICO' | 'CONJUNTO';

interface Lot {
  id: number;
  nome: string;
  tipo: LotType;
  cidade: string;
  pais: string;
  envioPrioritario: boolean;
  dataEnvio: string;
  createdAt: Date;
}

@Component({
  selector: 'app-lots',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.css']
})
export class LotsComponent {
  showLots = false;

  form = {
    nome: '',
    tipo: 'UNICO' as LotType,
    cidade: '',
    pais: '',
    envioPrioritario: false,
    dataEnvio: ''
  };

  lots: Lot[] = [];

  get totalLotes(): number {
    return this.lots.length;
  }

  get totalPrioritarios(): number {
    return this.lots.filter(lot => lot.envioPrioritario).length;
  }

  get totalUnico(): number {
    return this.lots.filter(lot => lot.tipo === 'UNICO').length;
  }

  get totalConjunto(): number {
    return this.lots.filter(lot => lot.tipo === 'CONJUNTO').length;
  }

  createLot(): void {
    if (
      !this.form.nome.trim() ||
      !this.form.cidade.trim() ||
      !this.form.pais.trim() ||
      !this.form.dataEnvio.trim()
    ) {
      alert('Preencha todos os campos obrigatórios do lote.');
      return;
    }

    const newLot: Lot = {
      id: Date.now(),
      nome: this.form.nome.trim(),
      tipo: this.form.tipo,
      cidade: this.form.cidade.trim(),
      pais: this.form.pais.trim(),
      envioPrioritario: this.form.envioPrioritario,
      dataEnvio: this.form.dataEnvio,
      createdAt: new Date()
    };

    this.lots.unshift(newLot);
    this.resetForm();
    this.showLots = true;
  }

  toggleLotsView(): void {
    this.showLots = !this.showLots;
  }

  resetForm(): void {
    this.form = {
      nome: '',
      tipo: 'UNICO',
      cidade: '',
      pais: '',
      envioPrioritario: false,
      dataEnvio: ''
    };
  }

  removeLot(id: number): void {
    this.lots = this.lots.filter(lot => lot.id !== id);
  }
}