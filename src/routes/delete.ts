.delete('/:id' async({params, set }) => {
    const {id} = params

    try{
        const[usuario] = await sql `
            UPDATE usuarios
            SET ativo = false, atualizado_em = now()
            WHERE id = ${id} AND ativo = true 
            RETURNING id, nome, email, idade, criado_em, ativo
            `
    }
}
