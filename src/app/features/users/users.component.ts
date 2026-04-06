import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

interface Transporter {
  id: number;
  name: string;
  plate: string;
  vehicleType: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-users',
  imports: [RouterLink, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  activeTab = 'administradores';
  showModal = false;

  newUser  = { name: '', email: '' };
  newTransporter = { name: '', plate: '', vehicleType: 'Caminhão' };

  readonly vehicleTypes = ['Caminhão', 'Van', 'Utilitário', 'Moto', 'Carro'];

  administrators: User[] = [
    { id: 1, name: 'Seiji Hoshino',    email: 'seiji@safesupply.com',   status: 'active' },
    { id: 2, name: 'Sabrina Gabrielle', email: 'sabrina@safesupply.com', status: 'active' },
    { id: 3, name: 'Rodolfo Alves',    email: 'rodolfo@safesupply.com',  status: 'active' },
    { id: 4, name: 'Gabriel Yudi',     email: 'gabriel@safesupply.com',  status: 'active' },
  ];

  producers: User[] = [
    { id: 5,  name: 'Fazenda Malunga',            email: 'malunga@hotmail.com',          status: 'active'   },
    { id: 6,  name: 'Fazenda Vale das Palmeiras', email: 'valedaspalmeiras@outlook.com', status: 'inactive' },
    { id: 7,  name: 'Fazenda da Toca',            email: 'toca@gmail.com',               status: 'active'   },
    { id: 8,  name: 'Fazenda Nata da Serra',      email: 'natadaserra@proton.com',       status: 'active'   },
  ];

  auditors: User[] = [
    { id: 9,  name: 'Ricardo Lopes',   email: 'ricardo@hotmail.com', status: 'active'   },
    { id: 10, name: 'Tiago Brumassio', email: 'tiago@outlook.com',   status: 'inactive' },
  ];

  transporters: Transporter[] = [
    { id: 11, name: 'Ricoo Log Transportes e Logística', plate: 'ABC-1234', vehicleType: 'Caminhão', status: 'active' },
  ];

  retailers: User[] = [];

  get isTransporterTab(): boolean {
    return this.activeTab === 'transportadores';
  }

  get activeTabLabel(): string {
    return this.activeTab.toUpperCase();
  }

  get nextId(): number {
    const all = [
      ...this.administrators,
      ...this.producers,
      ...this.auditors,
      ...this.transporters,
      ...this.retailers,
    ];
    return all.length > 0 ? Math.max(...all.map(u => u.id)) + 1 : 1;
  }

  openModal(): void {
    this.newUser       = { name: '', email: '' };
    this.newTransporter = { name: '', plate: '', vehicleType: 'Caminhão' };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  registerUser(): void {
    if (this.isTransporterTab) {
      if (!this.newTransporter.name.trim() || !this.newTransporter.plate.trim()) return;

      const transporter: Transporter = {
        id:          this.nextId,
        name:        this.newTransporter.name.trim(),
        plate:       this.newTransporter.plate.trim().toUpperCase(),
        vehicleType: this.newTransporter.vehicleType,
        status:      'active',
      };
      this.transporters = [...this.transporters, transporter];

    } else {
      if (!this.newUser.name.trim() || !this.newUser.email.trim()) return;

      const user: User = {
        id:     this.nextId,
        name:   this.newUser.name.trim(),
        email:  this.newUser.email.trim(),
        status: 'active',
      };

      switch (this.activeTab) {
        case 'administradores': this.administrators = [...this.administrators, user]; break;
        case 'produtores':      this.producers      = [...this.producers,      user]; break;
        case 'auditores':       this.auditors        = [...this.auditors,       user]; break;
        case 'varejistas':      this.retailers       = [...this.retailers,      user]; break;
      }
    }

    this.closeModal();
  }

  toggleStatus(item: { status: 'active' | 'inactive' }): void {
    item.status = item.status === 'active' ? 'inactive' : 'active';
  }
}
