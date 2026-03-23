import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'Rafael Silva',
  description: 'Portfolio de Desenvolvimento - Projetos, arquitetura e decisoes tecnicas',
  lang: 'pt-BR',
  cleanUrls: true,
  base: '/dev-portfolio/',

  head: [
    ['meta', { name: 'author', content: 'Rafael Silva' }],
    ['meta', { name: 'keywords', content: 'portfolio, desenvolvedor, typescript, vite, frontend, backend, go, python, mcp' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' }],
  ],

  themeConfig: {
    siteTitle: 'Rafael Silva',

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
      '/projects/go-work/': [
        {
          text: 'go-work',
          items: [
            { text: 'Visao Geral', link: '/projects/go-work/' },
            { text: 'Arquitetura', link: '/projects/go-work/arquitetura' },
            { text: 'Padroes Tecnicos', link: '/projects/go-work/padroes' },
            { text: 'Pipeline de Dados', link: '/projects/go-work/pipeline' },
            { text: 'Infra e Deploy', link: '/projects/go-work/deploy' },
          ],
        },
      ],
      '/projects/poke-mcp/': [
        {
          text: 'poke-mcp',
          items: [
            { text: 'Visao Geral', link: '/projects/poke-mcp/' },
            { text: 'Arquitetura', link: '/projects/poke-mcp/arquitetura' },
            { text: 'Installer e Distribuicao', link: '/projects/poke-mcp/distribuicao' },
          ],
        },
      ],
      '/projects/business-assistant/': [
        {
          text: 'Business Assistant',
          items: [
            { text: 'Visao Geral', link: '/projects/business-assistant/' },
            { text: 'Arquitetura', link: '/projects/business-assistant/arquitetura' },
            { text: 'Autenticacao e Seguranca', link: '/projects/business-assistant/autenticacao' },
            { text: 'Modelo de Dados', link: '/projects/business-assistant/modelo-dados' },
            { text: 'Excecoes e Logging', link: '/projects/business-assistant/excecoes' },
            { text: 'Deploy e CI/CD', link: '/projects/business-assistant/deploy' },
          ],
        },
      ],
      '/projects/': [
        {
          text: 'Projetos',
          items: [
            { text: 'Todos os Projetos', link: '/projects/' },
            { text: 'Business Assistant', link: '/projects/business-assistant/' },
            { text: 'Arbo Solucoes', link: '/projects/arbo-solucoes/' },
            { text: 'go-work', link: '/projects/go-work/' },
            { text: 'poke-mcp', link: '/projects/poke-mcp/' },
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
}))
