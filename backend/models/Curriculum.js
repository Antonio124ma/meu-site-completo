const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        year: Number,
      },
    ],
    skills: {
      type: [String],
      default: [],
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      website: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Curriculum', CurriculumSchema);
