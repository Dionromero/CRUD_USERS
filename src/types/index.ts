export interface Usuario {
    id: number;
    nome: string;
    email: string;
    idade?: number;
    criado_em: Date;
    atualizado_em?: Date;
}

export interface CriarUsuario {
    nome: string;
    email: string;
    idade?: number;
}

export interface AtualizarUsuario {
    nome?: string;
    email?: string;
    idade?: number;
}

export interface DeletarUsuario {
    id: number;
}

export interface ResponseUsuario {
    usuario: Usuario;
}

export interface ResponseUsuarios {
    usuarios: Usuario[];
}
