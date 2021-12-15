import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Cliente } from '../interfaces/cliente';
import { ClienteService } from './cliente.service';
import { DialogClienteComponent } from './dialog-cliente/dialog-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public displayedColumns: string[] = ['cpf', 'nome', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<Cliente>();
  public cliente!: Cliente;

  constructor(private clienteService: ClienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.dataSource.data = clientes;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editCliente(cliente: Cliente): void {
    this.clienteService.editCliente(cliente).subscribe({
      next: () => {
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  createCliente(cliente: Cliente): void {
    this.clienteService.createCliente(cliente).subscribe({
      next: (clienteC: Cliente) => {
        this.dataSource.data.push(clienteC);
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  deleteCliente(cliente: Cliente): void {
    this.clienteService.deleteCliente(cliente).subscribe({
      next: () => {
        var index = this.dataSource.data.indexOf(cliente);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '400px',
      height: '300px',
      data: { cpf: '', nome: '' }
    });

    dialogRef.afterClosed().subscribe((cliente: Cliente) => {
      if (cliente) {
        this.createCliente(cliente);
      }
    });
  }

  openDialogEdit(cliente: Cliente): void {
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: '400px',
      height: '300px',
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((cliente: Cliente) => {
      if (cliente) {
        this.editCliente(cliente);
      }
    });
  }
}
