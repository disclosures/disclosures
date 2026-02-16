import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://disclosures.dev',
  integrations: [
    starlight({
      title: 'Disclosures',
      description: 'Animated disclosure components with smooth height transitions, accessible by default.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/disclosures/disclosures' },
      ],
      sidebar: [
        {
          label: 'Start Here',
          autogenerate: { directory: 'start-here' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Patterns',
          autogenerate: { directory: 'patterns' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Explanations',
          autogenerate: { directory: 'explanations' },
        },
      ],
    }),
  ],
});
