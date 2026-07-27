const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');

// Helper para upload de imagem via base64 (funciona com memoryStorage)
const uploadImage = async (file) => {
  if (!file) return null;

  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = `data:${file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'portfolio/projects',
    resource_type: 'image',
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Projeto não encontrado' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, technologies, link, featured } = req.body;

    if (!title) {
      return res.status(400).json({ msg: 'Título é obrigatório' });
    }

    let imageUrl = '';
    if (req.file) {
      const uploaded = await uploadImage(req.file);
      imageUrl = uploaded.url;
    }

    const techArray = technologies
      ? (typeof technologies === 'string'
          ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : technologies)
      : [];

    const project = await Project.create({
      title,
      description: description || '',
      technologies: techArray,
      link: link || '',
      imageUrl,
      featured: featured === 'true' || featured === true,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Projeto não encontrado' });

    const { title, description, technologies, link, featured } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (link !== undefined) project.link = link;
    if (featured !== undefined) {
      project.featured = featured === 'true' || featured === true;
    }

    if (technologies !== undefined) {
      project.technologies = typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : technologies;
    }

    if (req.file) {
      const uploaded = await uploadImage(req.file);
      project.imageUrl = uploaded.url;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Projeto não encontrado' });
    res.json({ msg: 'Projeto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
