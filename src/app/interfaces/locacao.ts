import { Automovel } from "./automovel";
import { Cliente } from "./cliente";

export interface Locacao {
    cliente: Cliente;
    automovel: Automovel;
    dias: number;
    valor: number;
}