import mongoose, { Schema } from 'mongoose';

const schema = {
  header: {
    title: {
      type: 'String',
      required: true,
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
  details: {},
  popularity: { type: 'Mixed', default: {} },
  rating: {
    type: 'String',
    required: true,
    default: 'No Ratings',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  slug: {
    type: 'String',
    required: true,
    unique: true,
  },
};

const DistroSchema = new Schema(schema, { minimize: false });
const Distro = mongoose.models.Distro || mongoose.model('Distro', DistroSchema);

export default Distro;
