import { Star } from 'lucide-react';
import HyprWindow from '../HyprWindow';
import useGithubRepos from '../../hooks/useGithubRepos';

const featured = [
  {
    slug: 'airline-reservation',
    title: 'Airline Reservation System',
    description: 'Full-stack app for managing airline reservations, with user authentication and real-time updates.',
    tech: ['React', 'Django', 'Tailwind'],
    github: null, // repo returns 404 publicly
  },
  {
    slug: 'CLI-Task-Manager',
    title: 'CLI Task Manager',
    description: 'A terminal task manager in Python for creating, tracking and organising to-dos.',
    tech: ['Python'],
    github: 'https://github.com/neupane-rajan/CLI-Task-Manager',
  },
  {
    slug: 'cosmic-terminal-theme-pack',
    title: 'Cosmic Terminal Theme Pack',
    description: 'Space and nature themes for kitty and the fish shell.',
    tech: ['Shell', 'kitty', 'fish'],
    github: 'https://github.com/neupane-rajan/cosmic-terminal-theme-pack',
  },
];

// GitHub's own linguist colours, nudged toward Catppuccin
const languageColor: Record<string, string> = {
  TypeScript: '#89b4fa',
  JavaScript: '#f9e2af',
  Python: '#74c7ec',
  HTML: '#fab387',
  CSS: '#cba6f7',
  Shell: '#a6e3a1',
  C: '#9399b2',
  Lua: '#b4befe',
};

const relativeTime = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return 'today';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

function RepoList() {
  const state = useGithubRepos();

  if (state.status === 'loading') return <p className="text-ctp-overlay1">Fetching repositories from GitHub…</p>;
  if (state.status === 'error')
    return (
      <p className="text-ctp-red">
        {state.message}{' '}
        <a className="text-ctp-blue underline" href="https://github.com/neupane-rajan?tab=repositories" target="_blank" rel="noopener noreferrer">
          Open the list on GitHub
        </a>
      </p>
    );

  return (
    <>
      <p className="mb-3 text-ctp-overlay1">
        Showing {state.repos.length} repositories in @neupane-rajan, most recently pushed first
      </p>
      <ul className="m-0 list-none space-y-0.5 p-0">
        {state.repos.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[1fr_auto] gap-x-4 rounded px-2 py-1.5 hover:bg-ctp-surface0/70 sm:grid-cols-[minmax(0,14rem)_1fr_auto]"
            >
              <span className="truncate font-semibold text-ctp-blue group-hover:text-ctp-sapphire">{repo.name}</span>
              <span className="col-span-2 row-start-2 truncate text-ctp-subtext0 sm:col-span-1 sm:row-start-auto">
                {repo.description ?? <span className="text-ctp-overlay0">no description</span>}
              </span>
              <span className="flex items-center justify-end gap-3 whitespace-nowrap text-xs text-ctp-overlay1">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: languageColor[repo.language] ?? '#9399b2' }} />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" /> {repo.stargazers_count}
                  </span>
                )}
                <span className="hidden w-14 text-right md:inline">{relativeTime(repo.pushed_at)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ProjectsWorkspace() {
  return (
    <div className="row g-2 lg:h-full">
      <div className="col-lg-5 flex flex-col gap-2 lg:h-full">
        {featured.map((project) => (
          <HyprWindow key={project.slug} title={`kitty — ~/projects/${project.slug}`} className="flex-1 p-4 text-sm">
            <p className="truncate text-xs text-ctp-overlay1">
              <span className="text-ctp-green">❯</span> cd ~/projects/{project.slug}
            </p>
            <h2 className="mb-1.5 mt-2 text-lg font-bold leading-snug text-ctp-text">{project.title}</h2>
            <p className="mb-3 leading-relaxed text-ctp-subtext0">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="badge badge-ctp">{t}</span>
              ))}
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-ctp-blue underline decoration-ctp-surface2 underline-offset-4 hover:decoration-ctp-blue"
                >
                  source on GitHub
                </a>
              ) : (
                <span className="ml-auto text-xs text-ctp-overlay0">source not public</span>
              )}
            </div>
          </HyprWindow>
        ))}
      </div>

      <div className="col-lg-7 lg:h-full">
        <HyprWindow title="kitty — gh repo list neupane-rajan" className="min-h-[420px]">
          <div className="flex-1 overflow-y-auto p-4 text-sm">
            <p className="mb-2 text-ctp-subtext0">
              <span className="text-ctp-green">❯</span> gh repo list neupane-rajan --source
            </p>
            <RepoList />
          </div>
        </HyprWindow>
      </div>
    </div>
  );
}
