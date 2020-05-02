const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    //antes de executar cada um dos testes
    beforeEach(async () => {
        //desfaz todas as migrations (zera o banco de dados antes de começar os testes)
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    //executar depois de todos os testes. afterEach: executa no final de cada teste.
    afterAll(async () => {
        //desfaz a conexão do teste com o banco de dados.
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        //send: quais dados deseja enviar
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@test.com",
                whatsapp: "31998765432",
                city: "Rio do Sul",
                uf: "SC"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})