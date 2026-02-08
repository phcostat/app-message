import { Usuario } from "./usuario";

export class Mensagem {
    id: number;
    texto: string;
    usuarioRemetente: Usuario;
    usuarioDestinatario: Usuario;

    constructor() {
        this.id = 0;
        this.texto = "";
        this.usuarioRemetente = new Usuario();
        this.usuarioDestinatario = new Usuario();
    }
}
