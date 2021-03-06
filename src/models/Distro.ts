import { DistroDocument, DistroModel } from './Distro.d';
import mongoose, { Schema } from 'mongoose';

const schema = {
  header: {
    title: {
      type: String,
      required: true,
    },
    attributes: {
      type: 'Mixed',
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
  popularity: { type: 'Mixed' },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
};

const DistroSchema = new Schema<DistroModel>(schema, {
  minimize: false,
  timestamps: true,
});
const Distro =
  mongoose.models.Distro ||
  mongoose.model<DistroDocument>('Distro', DistroSchema);

export default Distro;
