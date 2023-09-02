import { Endereco } from "../enderecos/endereco.model";

export class Pessoa {
    constructor(
        public codigoPessoa?: number,
        public nome?: string,
        public sobrenome?: string,
        public idade?: string,
        public login?: string,
        public senha?: string,
        public status?: string,
        public enderecos?: Endereco
      
    ){}
} 