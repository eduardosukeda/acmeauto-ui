import { Automovel } from "./automovel";
import { Cliente } from "./cliente";

export interface CalculoResponse {
    cliente: Cliente,
    automovel: Automovel,
    dias: number,
    valor: number,
    valorReal: string
}