const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    // Só permite registro se ALLOW_REGISTER=true ou se não existir nenhum usuário
    const userCount = await User.countDocuments();
    if (userCount > 0 && process.env.ALLOW_REGISTER !== 'true') {
      return res.status(403).json({ msg: 'Registro de novos usuários desabilitado.' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email e senha são obrigatórios.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ msg: 'Este email já está cadastrado.' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ msg: 'Administrador criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
