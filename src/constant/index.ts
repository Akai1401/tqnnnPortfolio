export const REVALIDATE_TIME = 3600;

export enum CUSTOM_MESSAGE {
  ERROR = 'error',
}

export enum PAGE_STATE {
  LOADING,
  WELCOME,
  HERO,
}

export const MENU_ITEMS = [
  { label: 'About', labelMenu: 'About me', href: '/about' },
  { label: 'Works', labelMenu: 'Works', href: '/works' },
  { label: 'My story', labelMenu: 'My story', href: '/my-story' },
  { label: 'CV / Resume', labelMenu: 'CV / Resume', href: '/cv.pdf' },
];
