import { useEffect, useState } from 'react';

export interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

type State = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; repos: Repo[] };

const USER = 'neupane-rajan';
const CACHE_KEY = `gh-repos:${USER}`;
const CACHE_MS = 30 * 60 * 1000;

let request: Promise<Repo[]> | null = null;

function load(): Promise<Repo[]> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.at < CACHE_MS) return Promise.resolve(cached.repos);
  } catch {
    // storage unavailable, fall through to the network
  }

  request ??= fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`)
    .then(async (res) => {
      if (res.status === 403 || res.status === 429) throw new Error('GitHub rate limit reached. Try again in a few minutes.');
      if (!res.ok) throw new Error(`GitHub returned ${res.status}.`);
      const repos = ((await res.json()) as Repo[]).filter((r) => !r.fork);
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
      } catch {
        // ignore quota/private mode errors
      }
      return repos;
    })
    .catch((err) => {
      request = null;
      throw err;
    });
  return request;
}

/** Shared by the repo list and the language bars; one network request per session. */
export default function useGithubRepos() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let alive = true;
    load()
      .then((repos) => alive && setState({ status: 'ready', repos }))
      .catch((err: Error) => alive && setState({ status: 'error', message: err.message || "Couldn't reach GitHub." }));
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
