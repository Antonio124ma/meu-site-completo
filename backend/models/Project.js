const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
