export class Palestra {
    id: number;
    id_evento: string;
    nome: string;
    descricao:string;
    dt_palestra: string;
    horario_inicio_palestra:string;
    horario_fim_palestra:string;
    nome_palestrante:string;
    minicurriculo_palestrante:string;

    constructor(id: number,id_evento: string, nome: string,descricao:string,dt_palestra: string,horario_inicio_palestra:string,horario_fim_palestra:string,nome_palestrante:string,minicurriculo_palestrante:string){
        this.id = id;
        this.id_evento = id_evento;
        this.nome = nome;
        this.descricao = descricao;
        this.dt_palestra = dt_palestra;
        this.horario_inicio_palestra = horario_inicio_palestra;
        this.horario_fim_palestra = horario_fim_palestra;
        this.nome_palestrante = nome_palestrante;
        this.minicurriculo_palestrante = minicurriculo_palestrante;
    }
}
