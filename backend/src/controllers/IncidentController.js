const connection = require('../database/connection')

module.exports = {
    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        //pega o primeiro registro (existe apenas 1)
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) {
            //muda a status da requisição. 401: não autorizado, usuário não possui autorização para fazer o desejado.
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete()

        //muda a status da requisição. 204: resposta de sucesso para o frontend que não possui conteúdo de retorno.
        return response.status(204).send()
    },

    async index(request, response) {
        //busca a paginação. Se não existir utiliza por padrão o valor 1 (buscar os dados da página 1).
        const { page = 1 } = request.query

        //conta todos os registros
        const [count] = await connection('incidents').count()

        //limit: limita a busca para 5 registros
        //offset: pula de 5 em 5 registros por página
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        //manda o count para o cabeçalho da resposta da requisição
        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        //faz a desestruturação do array pegando o id retornado
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        //coloca em chaves para ir o nome do atributo junto
        return response.json({ id })
    }
}