import { Elysia } from "elysia"
import sql from "../database"
import { criarUsuarioSchema, atualizarUsuariosSchema } from "../schemas/usuarios"
import { set } from "zod"

export const usuariosRoutes = new Elysia({ prefix: "/api/usuarios" })

.post("/", async({ body,set }) => {
    const validacao = criarUsuarioSchema.safeParse(body);

    if (!validacao.success){
        set.status = 400;
        return {error: "dados invalidos", detalhes: validacao.error}
    }

const { nome, email, idade } = validacao.data;
try {
    const [ usuario ] = await sql `
    INSERT INTO usuarios (nome, email, idade)
    VALUES (${nome}, ${email}, ${idade ?? null})
    RETURNING *
    `;
    set.status = 201;
    return usuario;
}catch ( erro ) {if (erro instanceof Error && 'code' in erro && (erro as any).code === '23505') {
    set.status = 409;
    return { erro: 'Email ja cadastrado' };
  }
  throw erro;
}
})

.get( "/", async() => {
    const usuario = await sql `
    SELECT * FROM usuarios ORDER BY criado_em DESC
    `;
    return usuario;
})

.get ( "/:id", async({ params, set }) => {
    const [ usuario ] = await sql `
    SELECT * FROM usuarios WHERE id = ${ params.id }
    `;
    if ( !usuario ){
        set.status = 404;
        return {error: "usuario nao encontrado"}
    } return usuario;
})

