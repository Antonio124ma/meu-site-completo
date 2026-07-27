const Curriculum = require('../models/Curriculum');

// Retorna o único currículo (ou cria um vazio se não existir)
exports.getCurriculum = async (req, res) => {
  try {
    let curriculum = await Curriculum.findOne();
    if (!curriculum) {
      curriculum = await Curriculum.create({});
    }
    res.json(curriculum);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualiza o currículo (upsert)
exports.updateCurriculum = async (req, res) => {
  try {
    const data = req.body;

    // Garante que skills seja array
    if (data.skills && typeof data.skills === 'string') {
      data.skills = data.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    let curriculum = await Curriculum.findOne();

    if (!curriculum) {
      curriculum = await Curriculum.create(data);
    } else {
      Object.assign(curriculum, data);
      await curriculum.save();
    }

    res.json(curriculum);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
