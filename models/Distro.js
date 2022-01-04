import mongoose from 'mongoose';

const DistroSchema = new mongoose.Schema({
  header: {
    title: {
      type: 'String',
      required: true,
      unique: true,
    },
    attributes: {
      type: ['Array'],
    },
    logo: {
      type: 'String',
    },
    description: {
      type: 'String',
    },
  },
  details: {
    'Home Page': {
      type: ['Mixed'],
    },
    'Mailing Lists': {
      type: ['Mixed'],
    },
    'User Forums': {
      type: 'Array',
    },
    'Alternative User Forums': {
      type: 'Array',
    },
    Documentation: {
      type: ['Mixed'],
    },
    Screenshots: {
      type: ['Mixed'],
    },
    Screencasts: {
      type: 'Array',
    },
    'Download Mirrors': {
      type: ['Mixed'],
    },
    'Bug Tracker': {
      type: ['Mixed'],
    },
    'Related Websites': {
      type: ['Mixed'],
    },
    Reviews: {
      type: ['Mixed'],
    },
    'Where To Buy or Try': {
      type: 'Array',
    },
  },
  popularity: {
    '12 months': {
      type: 'String',
    },
    '6 months': {
      type: 'String',
    },
    '3 months': {
      type: 'String',
    },
    '4 weeks': {
      type: 'String',
    },
    '1 week': {
      type: 'String',
    },
  },
  rating: {
    type: 'String',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: 'String',
    required: true,
    unique: true,
  },
});

const Distro = mongoose.models.Distro || mongoose.model('Distro', DistroSchema);

export default Distro;
