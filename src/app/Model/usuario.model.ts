export class Usuario {
    id: number;
    cpf:string;
    nome: string;
    email:string;
    senha: string;
    admin: boolean;

    constructor(id:number, cpf:string, nome: string, email: string, senha:string){
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.admin = false;
    }
}
