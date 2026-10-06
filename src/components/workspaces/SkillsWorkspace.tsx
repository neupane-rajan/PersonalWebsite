import type { IconType } from 'react-icons';
import { FaTerminal } from 'react-icons/fa';
import {
  SiArchlinux, SiC, SiCss, SiDjango, SiDocker, SiFastapi, SiFlask, SiGit, SiGnubash,
  SiHtml5, SiJavascript, SiLinux, SiLua, SiMysql, SiNeovim, SiPostgresql, SiPostman,
  SiPython, SiReact, SiTypescript, SiVim, SiVuedotjs,
} from 'react-icons/si';
import HyprWindow from '../HyprWindow';
import useGithubRepos from '../../hooks/useGithubRepos';
import HyprConf from '../toys/HyprConf';

type Skill = [name: string, Icon: IconType];

const groups: { name: string; color: string; skills: Skill[] }[] = [
  {
    name: 'languages',
    color: 'text-ctp-peach',
    skills: [['python', SiPython], ['javascript', SiJavascript], ['typescript', SiTypescript], ['c', SiC], ['lua', SiLua], ['bash', SiGnubash]],
  },
  {
    name: 'frontend',
    color: 'text-ctp-sky',
    skills: [['react', SiReact], ['vue', SiVuedotjs], ['html', SiHtml5], ['css', SiCss]],
  },
  {
    name: 'backend',
    color: 'text-ctp-green',
    skills: [['django', SiDjango], ['flask', SiFlask], ['fastapi', SiFastapi], ['postgresql', SiPostgresql], ['mysql', SiMysql]],
  },
  {
    name: 'tools',
    color: 'text-ctp-mauve',
    skills: [['arch', SiArchlinux], ['linux', SiLinux], ['git', SiGit], ['docker', SiDocker], ['neovim', SiNeovim], ['vim', SiVim], ['postman', SiPostman], ['shell', FaTerminal]],
  },
];

const total = groups.reduce((n, g) => n + g.skills.length, 0);

/** tokei-style breakdown of the languages across public repos, from the GitHub API */
function Languages() {
  const state = useGithubRepos();
  if (state.status === 'loading') return <p className="text-ctp-overlay1">Counting languages…</p>;
  if (state.status === 'error') return <p className="text-ctp-red">{state.message}</p>;

  const counts = new Map<string, number>();
  for (const repo of state.repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const rows = [...counts].sort((a, b) => b[1] - a[1]);
  const max = rows[0]?.[1] ?? 1;
  const total = rows.reduce((n, [, c]) => n + c, 0);

  return (
    <table className="w-full border-separate border-spacing-y-1 text-sm">
      <thead>
        <tr className="text-left text-ctp-overlay1">
          <th className="pr-4 font-normal">Language</th>
          <th className="w-full font-normal">Repos</th>
          <th className="pl-3 text-right font-normal">%</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([lang, count]) => (
          <tr key={lang}>
            <td className="whitespace-nowrap pr-4 text-ctp-text">{lang}</td>
            <td>
              <span className="flex items-center gap-2">
                <span className="h-2.5 rounded-sm bg-ctp-mauve" style={{ width: `${(count / max) * 100}%` }} />
                <span className="text-xs text-ctp-overlay1">{count}</span>
              </span>
            </td>
            <td className="pl-3 text-right text-ctp-subtext0">{Math.round((count / total) * 100)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SkillsWorkspace() {
  return (
    <div className="flex flex-col gap-2 lg:h-full">
      <div className="grid gap-2 lg:grid-cols-[7fr_5fr]">
        <HyprWindow title="kitty — pacman -Qg rajan" className="p-4 text-sm sm:p-5">
          <p className="mb-3 text-ctp-subtext0">
            <span className="text-ctp-green">❯</span> pacman -Qg rajan
          </p>
          <dl className="m-0 space-y-2.5">
            {groups.map((group) => (
              <div key={group.name} className="sm:flex sm:gap-6">
                <dt className={`mb-1 w-24 shrink-0 font-semibold sm:mb-0 ${group.color}`}>{group.name}</dt>
                <dd className="m-0 flex flex-wrap gap-x-5 gap-y-1.5">
                  {group.skills.map(([name, Icon]) => (
                    <span key={name} className="inline-flex items-center gap-1.5 text-ctp-text">
                      <Icon className="h-3.5 w-3.5 text-ctp-overlay1" aria-hidden="true" />
                      {name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ctp-overlay1">{total} packages installed, 0 orphans</p>
        </HyprWindow>

        <HyprWindow title="kitty — languages on GitHub" className="p-4 sm:p-5">
          <p className="mb-3 text-sm text-ctp-subtext0">
            <span className="text-ctp-green">❯</span> gh api users/neupane-rajan/repos | tokei
          </p>
          <Languages />
        </HyprWindow>
      </div>

      <HyprWindow title="nvim — ~/.config/hypr/hyprland.conf" className="h-[420px] lg:h-auto lg:min-h-0 lg:flex-1">
        <HyprConf />
      </HyprWindow>
    </div>
  );
}
