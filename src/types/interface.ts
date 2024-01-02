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


export interface License {
  key: String;
  name: String;
  spdx_id: String;
  url: String;
  node_id: String;
}

export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  license: License | null;
  topics: string[] | null;
  forks: number;
  open_issues: number;
  watchers: number;
  network_count: number;
  subscribers_count: number;
  inProgress?: boolean
}
