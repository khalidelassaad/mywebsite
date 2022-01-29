import * as React from 'react';
import AthleticsMarkdown from './pages/markdown/Athletics.md';
import CodefolioMarkdown from './pages/markdown/Codefolio.md';
import ContactMarkdown from './pages/markdown/Contact.md';
import HomeMarkdown from './pages/markdown/Home.md';
import WebsiteStructure from './WebsiteStructure';

const myWebsiteStructure: WebsiteStructure = {
  navBarPages: [
    {
      navBarButtonLabel: 'HOME',
      pageURL: '/',
      importedMarkdownObject: HomeMarkdown,
    },
    {
      navBarButtonLabel: 'CODEFOLIO',
      pageURL: '/codefolio',
      importedMarkdownObject: CodefolioMarkdown,
      childPages: [
        {
          navBarButtonLabel: 'CODE 1',
          pageURL: '/codefolio/code_1',
          importedMarkdownObject: HomeMarkdown,
        },
        {
          navBarButtonLabel: 'CODE 2',
          pageURL: '/codefolio/code_2',
          importedMarkdownObject: HomeMarkdown,
        },
      ],
    },
    {
      navBarButtonLabel: 'ATHLETICS',
      pageURL: '/athletics',
      importedMarkdownObject: AthleticsMarkdown,
    },
    {
      navBarButtonLabel: 'CONTACT',
      pageURL: '/contact',
      importedMarkdownObject: ContactMarkdown,
    },
    {
      navBarButtonLabel: 'FRACTAL',
      pageURL: '/fractal',
      element: <div>This is a fractal bro trust</div>,
    },
  ],
};
