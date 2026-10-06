export const workspaces = [
  { id: 'home', name: 'Home', title: 'kitty — ~' },
  { id: 'about', name: 'About', title: 'nvim — ~/about/journey.md' },
  { id: 'projects', name: 'Projects', title: 'gh repo list neupane-rajan' },
  { id: 'skills', name: 'Skills', title: 'kitty — pacman -Qg rajan' },
  { id: 'contact', name: 'Contact', title: 'aerc — new message' },
  { id: 'toys', name: 'Toys', title: 'kitty — ~/toys' },
] as const;

export type WorkspaceId = (typeof workspaces)[number]['id'];

export const workspaceIndex = (id: string) => workspaces.findIndex((w) => w.id === id);

/** Jump to a workspace the same way everywhere: waybar, number keys and the shell */
export const goToWorkspace = (id: WorkspaceId) => {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
};
