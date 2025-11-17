export type Menu = {
  _id: string;
  name: string;
  label: string;
  description?: string;
  icon?: string;
  path?: string;
  externalUrl?: string;
  type?: 'route' | 'group' | 'link' | 'divider';
  parent?: string;
  isActive?: boolean;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
