const Photo = require('../models/Photo');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (file) => {
  if (!file) return null;

  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataURI = `data:${file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'portfolio/gallery',
    resource_type: 'image',
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Imagem é obrigatória' });
    }

    const { title } = req.body;
    const uploaded = await uploadImage(req.file);

    const photo = await Photo.create({
      title: title || '',
      url: uploaded.url,
      publicId: uploaded.publicId,
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ msg: 'Foto não encontrada' });

    if (req.body.title !== undefined) photo.title = req.body.title;

    if (req.file) {
      // Opcional: deletar imagem antiga no Cloudinary
      if (photo.publicId) {
        try {
          await cloudinary.uploader.destroy(photo.publicId);
        } catch (e) {
          console.warn('Não foi possível deletar imagem antiga:', e.message);
        }
      }
      const uploaded = await uploadImage(req.file);
      photo.url = uploaded.url;
      photo.publicId = uploaded.publicId;
    }

    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ msg: 'Foto não encontrada' });

    // Deleta do Cloudinary se tiver publicId
    if (photo.publicId) {
      try {
        await cloudinary.uploader.destroy(photo.publicId);
      } catch (e) {
        console.warn('Não foi possível deletar do Cloudinary:', e.message);
      }
    }

    await photo.deleteOne();
    res.json({ msg: 'Foto removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
