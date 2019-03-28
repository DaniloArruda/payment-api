const mongoose = require('mongoose');

const Usuario = mongoose.model('Usuario');

module.exports = {
    async registrar(req, res) {
        const { email } = req.body;

        try {
            if (await Usuario.findOne({ email })) {
                return res.status(400).json({ error: "Este email já foi usado" });
            }

            const usuario = await Usuario.create(req.body);

            return res.json({ usuario });
        } catch (err) {
            return res.status(400).json({ error: "Registro de usuário falhou" });
        }
    },

    async autenticar(req, res) {
        try {
            const { email, senha } = req.body;

            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.status(400).json({ error: "Usuário não encontrado" });
            }

            if (!(await usuario.compareHash(senha))) {
                return res.status(400).json({ error: "Senha inválida" });
            }

            return res.json({
                usuario,
                token: usuario.generateToken()
            });
        } catch (err) {
            return res.status(400).json({ error: "Autenticação de usuário falhou" });
        }
    }
}