import { Document } from 'mongoose'


export interface IExperience extends Document {
  companyName: String;
  start: Date;
  description: String;
  end?: Date;
  position: String;
  responsibilities?: String[];
}

export interface IProject extends Document {
  name: String,
  time: Date,
  url: String,
  repo?: String,
  madeAt?: String,
  technologies: String[]
}