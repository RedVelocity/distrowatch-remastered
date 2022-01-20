import mongoose, { Schema } from 'mongoose';

const schema = {
  header: {
    title: {
      type: String,
      required: true,
    },
    attributes: {
      type: ['Array'],
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
      required: true,
      default: 'null',
    },
  },
  details: {},
  popularity: { type: 'Mixed', default: {} },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
};

const DistroSchema = new Schema(schema, { minimize: false });
const Distro = mongoose.models.Distro || mongoose.model('Distro', DistroSchema);

export default Distro;
