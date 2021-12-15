import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Automovel } from '../interfaces/automovel';
import { AutomovelService } from './automovel.service';
import { DialogAutomovelComponent } from './dialog-automovel/dialog-automovel.component';

@Component({
  selector: 'app-automovel',
  templateUrl: './automovel.component.html',
  styleUrls: ['./automovel.component.css']
})
export class AutomovelComponent implements OnInit {

  public displayedColumns: string[] = ['placa', 'marca', 'modelo', 'ano', 'valorDiaria', 'status', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<Automovel>();
  public automovel!: Automovel;

  constructor(private automovelService: AutomovelService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAutomoveis();
  }

  getAutomoveis(): void {
    this.automovelService.getAutomoveis().subscribe({
      next: (automoveis: Automovel[]) => {
        automoveis.map(automovel => {
          automovel.disponivel === true ? automovel.status = 'Sim' : automovel.status = 'Não';
        });
        this.dataSource.data = automoveis;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editAutomovel(automovel: Automovel): void {
    this.automovelService.editAutomovel(automovel).subscribe({
      next: () => {
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  createAutomovel(automovel: Automovel): void {
    this.automovelService.createAutomovel(automovel).subscribe({
      next: (auto: Automovel) => {
        auto.disponivel === true ? auto.status = 'Sim' : auto.status = 'Não';
        this.dataSource.data.push(auto);
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  deleteAutomovel(automovel: Automovel): void {
    this.automovelService.deleteAutomovel(automovel).subscribe({
      next: () => {
        var index = this.dataSource.data.indexOf(automovel);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(DialogAutomovelComponent, {
      width: '500px',
      height: '500px',
      data: { placa: '', marca: '', ano: '', valorDiaria: 0, disponivel: true }
    });

    dialogRef.afterClosed().subscribe((automovel: Automovel) => {
      if (automovel) {
        this.createAutomovel(automovel);
      }
    });
  }

  openDialogEdit(automovel: Automovel): void {
    const dialogRef = this.dialog.open(DialogAutomovelComponent, {
      width: '500px',
      height: '500px',
      data: automovel,
    });

    dialogRef.afterClosed().subscribe((automovel: Automovel) => {
      if (automovel) {
        this.editAutomovel(automovel);
      }
    });
  }
}
