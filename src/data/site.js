const base = import.meta.env.BASE_URL;

export const site = {
  name: 'Pei-Chi Hu',
  email: 'peichih@andrew.cmu.edu',
  linkedin: 'https://www.linkedin.com/in/peggyhuhu',
  // TODO: replace with your GitHub profile URL.
  github: 'https://github.com/PeiChi-Hu/',
  resume: `${base}Resume_PeiChi.pdf`,
  asrsPaper: `${base}PeiChi_ASRS_paper.pdf`,
  asrsDemo: 'https://youtu.be/lX7ymEV0xXg',
};

export const navLinks = [
  { id: 'path', label: 'Path' },
  { id: 'work', label: 'Selected Work' },
  { id: 'production', label: 'Production' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
];
