import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Cliente } from '../interfaces/cliente';
import { LocacaoService } from './locacao.service';
import { CalculoRequest } from '../interfaces/calculo-req';
import { Automovel } from '../interfaces/automovel';
import { CalculoResponse } from '../interfaces/calculo-res';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Locacao } from '../interfaces/locacao';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class LocacaoComponent implements OnInit {

  public firstFormGroup!: FormGroup;
  public secondFormGroup!: FormGroup;
  public isEditable: boolean = false;
  public calculoRequest!: CalculoRequest;
  public calculoResponse!: CalculoResponse;
  public locacaoRequest!: Locacao;
  public automoveis!: Automovel[];
  public clientes!: Cliente[];
  public selectedAutomovel!: Automovel;
  public selectedCliente!: Cliente;
  public dias!: number;

  constructor(private locacaoService: LocacaoService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      selectedCliente: ['', Validators.required],
      selectedAutomovel: ['', Validators.required],
      dias: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.getClientes();
    this.getAutomoveis();
  }

  createLocacao(): void {
    this.locacaoRequest = { cliente: this.calculoRequest.cliente, automovel: this.calculoRequest.automovel, dias: this.dias, valor: this.calculoResponse.valor };
    this.locacaoService.createLocacao(this.locacaoRequest).subscribe({
      next: (locacao: Locacao) => {
        console.log('ok')
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  calcularLocacao(): void {
    this.calculoRequest = { cliente: this.selectedCliente, automovel: this.selectedAutomovel, dias: this.dias };
    this.locacaoService.calcularLocacao(this.calculoRequest).subscribe({
      next: (calculo: CalculoResponse) => {
        this.calculoResponse = calculo;
        this.calculoResponse.valorReal = this.calculoResponse.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getClientes(): void {
    this.locacaoService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAutomoveis(): void {
    this.locacaoService.getAutomoveis().subscribe({
      next: (automoveis: Automovel[]) => {
        automoveis = automoveis.filter(automovel => {
          return automovel.disponivel === true;
        });
        this.automoveis = automoveis;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
