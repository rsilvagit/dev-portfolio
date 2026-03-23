import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rafael Silva',
  description: 'Portfolio de Desenvolvimento - Projetos, arquitetura e decisoes tecnicas',
  lang: 'pt-BR',
  cleanUrls: true,

  head: [
    ['meta', { name: 'author', content: 'Rafael Silva' }],
    ['meta', { name: 'keywords', content: 'portfolio, desenvolvedor, typescript, vite, frontend, backend' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Dev Portfolio',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projetos', link: '/projects/' },
      { text: 'GitHub', link: 'https://github.com/rsilvagit' },
    ],

    sidebar: {
      '/projects/arbo-solucoes/': [
        {
          text: 'Arbo Solucoes',
          items: [
            { text: 'Visao Geral', link: '/projects/arbo-solucoes/' },
            { text: 'Arquitetura', link: '/projects/arbo-solucoes/arquitetura' },
            { text: 'Modulos TypeScript', link: '/projects/arbo-solucoes/modulos' },
            { text: 'Design System CSS', link: '/projects/arbo-solucoes/design-system' },
            { text: 'SEO e Performance', link: '/projects/arbo-solucoes/seo-performance' },
            { text: 'Deploy e CI/CD', link: '/projects/arbo-solucoes/deploy' },
          ],
        },
      ],
      '/projects/': [
        {
          text: 'Projetos',
          items: [
            { text: 'Todos os Projetos', link: '/projects/' },
            { text: 'Arbo Solucoes', link: '/projects/arbo-solucoes/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rsilvagit' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/rsilvagit' },
    ],

    footer: {
      message: 'Portfolio de Desenvolvimento',
      copyright: '2024-present Rafael Silva',
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: 'Nesta pagina',
      level: [2, 3],
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Proximo',
    },
  },
})
