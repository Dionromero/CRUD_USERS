.delete('/:id', async ({ params, set }) => {
  const { id } = params

  try {
    const [usuario] = await sql`
      DELETE FROM usuarios
      WHERE id = ${id}
      RETURNING id, nome, email, idade, criado_em
    `

    if (!usuario) {
      set.status = 404
      return { error: 'usuario_nao_encontrado' }
    }

    set.status = 200
    return { success: true, data: usuario }
  } catch {
    set.status = 500
    return { error: 'erro_interno' }
  }
})
