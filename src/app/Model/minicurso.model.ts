export class Minicurso {
    id: number;
    id_evento: string;
    nome: string;
    descricao: string;
    dt_minicurso: string;
    horario_inicio_minicurso: string;
    horario_fim_minicurso : string;
    nome_instrutor: string;
    minicurriculo_instrutor: string;
    numero_vagas: string;
    dt_limite_inscricao: string;

    constructor(id: number, id_evento: string, nome: string, descricao: string, dt_minicurso: string, horario_inicio_minicurso: string, horario_fim_minicurso : string, nome_instrutor: string, minicurriculo_instrutor: string, numero_vagas: string, dt_limite_inscricao: string){
        this.id = id;
        this.id_evento = id_evento;
        this.nome = nome;
        this.descricao = descricao;
        this.dt_minicurso = dt_minicurso;
        this.horario_inicio_minicurso = horario_inicio_minicurso;
        this.horario_fim_minicurso = horario_fim_minicurso;
        this.nome_instrutor = nome_instrutor;
        this.minicurriculo_instrutor = minicurriculo_instrutor;
        this.numero_vagas = numero_vagas;
        this.dt_limite_inscricao = dt_limite_inscricao;
    }
}
