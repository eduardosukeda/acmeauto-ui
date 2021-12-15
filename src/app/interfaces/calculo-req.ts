import { Automovel } from "./automovel";
import { Cliente } from "./cliente";

export interface CalculoRequest {
    cliente: Cliente,
    automovel: Automovel,
    dias: number,
}