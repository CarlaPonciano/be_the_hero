//quando faz o login cria uma seção
//logout: deleta a sessão do backend (enviar o usuário para a tela de login: não é uma rota)
//apenas verifica se existe a ong cadastrada

const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        //responsabilidade> verificar se a ong existe
        const { id } = request.body

        //first para retornar apenas 1 resultado e não um array de tamanho 1
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()

        //se a ong nao existir
        if (!ong) {
            //muda a status da requisição. 400:bad request, algo deu errado.
            return response.status(400).json({ error: 'No ONG found with this ID' })
        }
        
        return response.json(ong)
    }
}