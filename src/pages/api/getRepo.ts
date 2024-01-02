import { GitHubRepo, License } from '@/types/interface';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR: string = path.resolve('./public/cache');

export const getRepo = async (repoName: string): Promise<any> => {
  const cacheFilePath: string = path.join(CACHE_DIR, `${repoName}.json`);

  try {
    // Check if the cache directory exists, create it if not
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // Check if the cache file exists and is not older than 10 days
    if (fs.existsSync(cacheFilePath)) {
      const stat: fs.Stats = fs.statSync(cacheFilePath);
      const lastModified: Date = new Date(stat.mtime.getTime());
      const now: Date = new Date();
      const diffInDays: number = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24);

      if (diffInDays < 10) {
        // Return cached data if it's still fresh
        const cachedData: string = fs.readFileSync(cacheFilePath, 'utf-8');
        return JSON.parse(cachedData);
      }
    }

    // Fetch data from GitHub API if cache is not available or is outdated

    const response: Response = await fetch(`https://api.github.com/repos/Yeasir-Hossain/${repoName}`);
    if (response.status !== 200) return response;

    const repoData: any = formatResponse(await response.json());

    // Save data to cache file
    fs.writeFileSync(cacheFilePath, JSON.stringify(repoData));

    return repoData;
  } catch (error) {
    console.log(error);
  }
};

const formatResponse = (response: any): GitHubRepo => {
  const license: License | null = response.license ? {
    key: response.license.key,
    name: response.license.name,
    spdx_id: response.license.spdx_id,
    url: response.license.url,
    node_id: response.license.node_id,
  } : null;

  return {
    id: response.id,
    node_id: response.node_id,
    name: response.name,
    full_name: response.full_name,
    html_url: response.html_url,
    description: response.description,
    created_at: response.created_at,
    updated_at: response.updated_at,
    pushed_at: response.pushed_at,
    homepage: response.homepage,
    stargazers_count: response.stargazers_count,
    watchers_count: response.watchers_count,
    language: response.language,
    forks_count: response.forks_count,
    license: license,
    topics: response.topics,
    forks: response.forks,
    open_issues: response.open_issues,
    watchers: response.watchers,
    network_count: response.network_count,
    subscribers_count: response.subscribers_count,
  };
};
