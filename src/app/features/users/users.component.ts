import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  nome: string;
  email?: string;
  placa?: string;
  vehicleType?: string;
  tipo: string;
  status: string;
}

const tipoToTab: Record<string, string> = {
  administrador:  'administradores',
  produtor:       'produtores',
  auditor:        'auditores',
  transportador:  'transportadores',
  varejista:      'varejistas',
};

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  activeTab = 'administradores';
  showUserForm = false;
  editingUser: User | null = null;
  private nextId = 12;

  readonly vehicleTypes = ['Caminhão', 'Van', 'Utilitário', 'Moto', 'Carro'];

  users: User[] = [
    { id: 1,  nome: 'Seiji Hoshino',                      email: 'seiji@safesupply.com',          tipo: 'administrador', status: 'ativo'   },
    { id: 2,  nome: 'Sabrina Gabrielle',                   email: 'sabrina@safesupply.com',         tipo: 'administrador', status: 'ativo'   },
    { id: 3,  nome: 'Rodolfo Alves',                       email: 'rodolfo@safesupply.com',         tipo: 'administrador', status: 'ativo'   },
    { id: 4,  nome: 'Gabriel Yudi',                        email: 'gabriel@safesupply.com',         tipo: 'administrador', status: 'ativo'   },
    { id: 5,  nome: 'Fazenda Malunga',                     email: 'malunga@hotmail.com',            tipo: 'produtor',      status: 'ativo'   },
    { id: 6,  nome: 'Fazenda Vale das Palmeiras',          email: 'valedaspalmeiras@outlook.com',   tipo: 'produtor',      status: 'inativo' },
    { id: 7,  nome: 'Fazenda da Toca',                     email: 'toca@gmail.com',                 tipo: 'produtor',      status: 'ativo'   },
    { id: 8,  nome: 'Fazenda Nata da Serra',               email: 'natadaserra@proton.com',         tipo: 'produtor',      status: 'ativo'   },
    { id: 9,  nome: 'Ricardo Lopes',                       email: 'ricardo@hotmail.com',            tipo: 'auditor',       status: 'ativo'   },
    { id: 10, nome: 'Tiago Brumassio',                     email: 'tiago@outlook.com',              tipo: 'auditor',       status: 'inativo' },
    { id: 11, nome: 'Ricoo Log Transportes e Logística',   placa: 'ABC-1234', vehicleType: 'Caminhão', tipo: 'transportador', status: 'ativo' },
  ];

  userForm = new FormGroup({
    nome:        new FormControl('', [Validators.required]),
    email:       new FormControl(''),
    placa:       new FormControl(''),
    vehicleType: new FormControl('Caminhão'),
    tipo:        new FormControl('', [Validators.required]),
    status:      new FormControl('ativo'),
  });

  get filteredUsers(): User[] {
    const tipo = Object.entries(tipoToTab).find(([, tab]) => tab === this.activeTab)?.[0];
    return this.users.filter(u => u.tipo === tipo);
  }

  get isTransporterTab(): boolean {
    return this.activeTab === 'transportadores';
  }

  get isTransporterForm(): boolean {
    return this.userForm.get('tipo')?.value === 'transportador';
  }

  openUserForm(): void {
    this.editingUser = null;
    this.userForm.reset({
      status:      'ativo',
      tipo:        this.isTransporterTab ? 'transportador' : '',
      vehicleType: 'Caminhão',
    });
    this.showUserForm = true;
  }

  openEditForm(user: User): void {
    this.editingUser = user;
    this.userForm.setValue({
      nome:        user.nome,
      email:       user.email        ?? '',
      placa:       user.placa        ?? '',
      vehicleType: user.vehicleType  ?? 'Caminhão',
      tipo:        user.tipo,
      status:      user.status,
    });
    this.showUserForm = true;
  }

  closeUserForm(): void {
    this.showUserForm = false;
    this.editingUser = null;
    this.userForm.reset({ status: 'ativo', tipo: '', vehicleType: 'Caminhão' });
  }

  onSubmit(): void {
    const { nome, email, placa, vehicleType, tipo, status } = this.userForm.value;

    if (!nome?.trim() || !tipo) return;
    if (tipo === 'transportador' && !placa?.trim()) return;
    if (tipo !== 'transportador' && !email?.trim()) return;

    if (this.editingUser) {
      this.editingUser.nome        = nome!.trim();
      this.editingUser.tipo        = tipo!;
      this.editingUser.status      = status!;
      if (tipo === 'transportador') {
        this.editingUser.placa       = placa!.trim().toUpperCase();
        this.editingUser.vehicleType = vehicleType!;
        this.editingUser.email       = undefined;
      } else {
        this.editingUser.email       = email!.trim();
        this.editingUser.placa       = undefined;
        this.editingUser.vehicleType = undefined;
      }
      this.users = [...this.users];
    } else {
      const user: User = tipo === 'transportador'
        ? { id: this.nextId++, nome: nome!.trim(), placa: placa!.trim().toUpperCase(), vehicleType: vehicleType!, tipo, status: status! }
        : { id: this.nextId++, nome: nome!.trim(), email: email!.trim(), tipo, status: status! };
      this.users = [...this.users, user];
    }

    this.activeTab = tipoToTab[tipo!];
    this.closeUserForm();
  }

  toggleStatus(user: User): void {
    user.status = user.status === 'ativo' ? 'inativo' : 'ativo';
    this.users = [...this.users];
  }
}
