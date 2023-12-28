import { IExperience } from '@/types/interface';
import { model, Schema, models } from 'mongoose';

const experienceSchema = new Schema<IExperience>({
  companyName: {
    type: String,
    maxLength: 120,
    minLength: 3,
    match: /[a-zA-Z0-9\s\-]/g,
    required: true
  },
  description: {
    type: String,
    maxLength: 255,
    minLength: 30,
    required: true
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date
  },
  position: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String,
    maxLength: 100,
    minLength: 3
  }]
});

experienceSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj).replace(/_id/g, 'id'));
};

const Experience = models.experience || model<IExperience>('experience', experienceSchema);


export default Experience;
