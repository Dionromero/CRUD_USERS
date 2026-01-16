import postgres from "postgres"

const sql = postgres({
    host: "localhost", 
    port: 5432,
    database: "CRUD_USUARIOS",
    username: "postgres",
    password: "12345678"
})

export async function inicializarBanco(){
    await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    idade INTENGER CHECK (idade >= 18 AND idade <= 150),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    console.log("banco de dados inicializado!!")
}

export default sql;