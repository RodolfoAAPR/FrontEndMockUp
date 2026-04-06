import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  status: string;
}

const tipoToTab: Record<string, string> = {
  administrador: 'administradores',
  produtor: 'produtores',
  auditor: 'auditores',
  transportador: 'transportadores',
  varejista: 'varejistas',
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

  users: User[] = [
    { id: 1, nome: 'Seiji Hoshino', email: 'seiji@safesupply.com', tipo: 'administrador', status: 'ativo' },
    { id: 2, nome: 'Sabrina Gabrielle', email: 'sabrina@safesupply.com', tipo: 'administrador', status: 'ativo' },
    { id: 3, nome: 'Rodolfo Alves', email: 'rodolfo@safesupply.com', tipo: 'administrador', status: 'ativo' },
    { id: 4, nome: 'Gabriel Yudi', email: 'gabriel@safesupply.com', tipo: 'administrador', status: 'ativo' },
    { id: 5, nome: 'Fazenda Malunga', email: 'malunga@hotmail.com', tipo: 'produtor', status: 'ativo' },
    { id: 6, nome: 'Fazenda Vale das Palmeiras', email: 'valedaspalmeiras@outlook.com', tipo: 'produtor', status: 'inativo' },
    { id: 7, nome: 'Fazenda da Toca', email: 'toca@gmail.com', tipo: 'produtor', status: 'ativo' },
    { id: 8, nome: 'Fazenda Nata da Serra', email: 'natadaserra@proton.com', tipo: 'produtor', status: 'ativo' },
    { id: 9, nome: 'Ricardo Lopes', email: 'ricardo@hotmail.com', tipo: 'auditor', status: 'ativo' },
    { id: 10, nome: 'Tiago Brumassio', email: 'tiago@outlook.com', tipo: 'auditor', status: 'inativo' },
    { id: 11, nome: 'Ricoo Log Transportes e Logística', email: 'rico@logística.com', tipo: 'transportador', status: 'ativo' },
  ];

  userForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipo: new FormControl('', [Validators.required]),
    status: new FormControl('ativo'),
  });

  get filteredUsers(): User[] {
    const tipo = Object.entries(tipoToTab).find(([, tab]) => tab === this.activeTab)?.[0];
    return this.users.filter(u => u.tipo === tipo);
  }

  openUserForm() {
    this.editingUser = null;
    this.showUserForm = true;
  }

  openEditForm(user: User) {
    this.editingUser = user;
    this.userForm.setValue({
      nome: user.nome,
      email: user.email,
      tipo: user.tipo,
      status: user.status,
    });
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
    this.editingUser = null;
    this.userForm.reset({ status: 'ativo', tipo: '' });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const { nome, email, tipo, status } = this.userForm.value;

      if (this.editingUser) {
        this.editingUser.nome = nome!;
        this.editingUser.email = email!;
        this.editingUser.tipo = tipo!;
        this.editingUser.status = status!;
      } else {
        this.users.push({
          id: this.nextId++,
          nome: nome!,
          email: email!,
          tipo: tipo!,
          status: status!,
        });
      }

      this.activeTab = tipoToTab[tipo!];
      this.closeUserForm();
    }
  }

  toggleStatus(user: User) {
    user.status = user.status === 'ativo' ? 'inativo' : 'ativo';
  }
}