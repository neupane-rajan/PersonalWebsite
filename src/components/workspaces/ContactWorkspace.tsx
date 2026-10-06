import { useState, type FormEvent } from 'react';
import HyprWindow from '../HyprWindow';
import { socials } from '../../data/socials';

// neofetch's arch_small logo
const archLogo = String.raw`
      /\
     /  \
    /\   \
   /      \
  /   ,,   \
 /   |  |  -\
/_-''    ''-_\
`;

const info: [label: string, value: string][] = [
  ['OS', 'Arch Linux x86_64'],
  ['WM', 'Hyprland'],
  ['Shell', 'zsh'],
  ['Editor', 'neovim'],
  ['Location', 'Kailali, Nepal'],
];

const palette = ['bg-ctp-surface1', 'bg-ctp-red', 'bg-ctp-green', 'bg-ctp-yellow', 'bg-ctp-blue', 'bg-ctp-pink', 'bg-ctp-teal', 'bg-ctp-subtext1'];

const EMAIL = 'rajanneupane202@gmail.com';

/** aerc-style compose window. There's no backend, so "Send" hands off to the visitor's mail app. */
function Compose() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const send = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ subject, body }).toString().replace(/\+/g, '%20');
    window.location.href = `mailto:${EMAIL}?${params}`;
  };

  return (
    <form onSubmit={send} className="flex h-full flex-col gap-3 p-4 text-sm sm:p-6">
      <div className="grid grid-cols-[4.5rem_1fr] items-center gap-x-3 gap-y-2">
        <span className="text-ctp-overlay1">From</span>
        <span className="text-ctp-subtext0">you</span>
        <span className="text-ctp-overlay1">To</span>
        <span className="text-ctp-text">Rajan Neupane &lt;{EMAIL}&gt;</span>
        <label htmlFor="mail-subject" className="form-label m-0 text-ctp-overlay1">Subject</label>
        <input
          id="mail-subject"
          className="form-control form-control-ctp"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Let's build something"
          required
        />
      </div>
      <label htmlFor="mail-body" className="sr-only">Message</label>
      <textarea
        id="mail-body"
        className="form-control form-control-ctp min-h-[180px] flex-1 resize-none"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Hi Rajan,"
        required
      />
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="rounded-md bg-ctp-mauve px-3 py-1.5 text-xs font-bold text-ctp-crust hover:bg-ctp-lavender">
          Send with your mail app
        </button>
        <span className="text-xs text-ctp-overlay0">or copy the address above</span>
      </div>
    </form>
  );
}

export default function ContactWorkspace() {
  return (
    <div className="row g-2 lg:h-full">
      <div className="col-lg-5 lg:h-full">
        <HyprWindow title="kitty — fastfetch" className="overflow-y-auto p-4 text-sm sm:p-6">
          <p className="mb-4 text-ctp-subtext0">
            <span className="text-ctp-green">❯</span> fastfetch
          </p>

        <div className="row g-4 align-items-start">
          <div className="col-sm-auto hidden sm:block">
            <pre className="m-0 select-none text-[13px] font-bold leading-tight text-ctp-blue" aria-hidden="true">
              {archLogo}
            </pre>
          </div>

          <div className="col">
            <p className="font-bold">
              <span className="text-ctp-mauve">rajan</span>
              <span className="text-ctp-text">@</span>
              <span className="text-ctp-mauve">arch</span>
            </p>
            <p className="mb-2 text-ctp-surface2">----------</p>

            <dl className="m-0 space-y-0.5">
              {info.map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="font-bold text-ctp-blue">{label}:</dt>
                  <dd className="m-0 text-ctp-text">{value}</dd>
                </div>
              ))}
              <div className="flex gap-2">
                <dt className="font-bold text-ctp-blue">Email:</dt>
                <dd className="m-0 min-w-0">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all text-ctp-text underline decoration-ctp-surface2 underline-offset-4 hover:text-ctp-mauve hover:decoration-ctp-mauve"
                  >
                    {EMAIL}
                  </a>
                </dd>
              </div>
              {socials.map(({ label, href, handle }) => (
                <div key={label} className="flex gap-2">
                  <dt className="font-bold text-ctp-blue">{label}:</dt>
                  <dd className="m-0">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ctp-text underline decoration-ctp-surface2 underline-offset-4 hover:text-ctp-mauve hover:decoration-ctp-mauve"
                    >
                      {handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex" aria-hidden="true">
              {palette.map((c) => (
                <span key={c} className={`h-4 w-7 ${c}`} />
              ))}
            </div>
          </div>
        </div>
          <p className="mt-auto pt-6 text-xs text-ctp-overlay0">© {new Date().getFullYear()} Rajan Neupane</p>
        </HyprWindow>
      </div>

      <div className="col-lg-7 lg:h-full">
        <HyprWindow title="aerc — new message">
          <Compose />
        </HyprWindow>
      </div>
    </div>
  );
}
