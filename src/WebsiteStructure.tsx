interface WebsiteStructure {
  navBarPages: NavBarPage[];
}

interface NavBarPageBase {
  navBarButtonLabel: string;
  pageURL: string;
}

interface NavBarBlogPage extends NavBarPageBase {
  importedMarkdownObject: string;
  element?: never;
}

interface NavBarElementPage extends NavBarPageBase {
  element: JSX.Element;
  importedMarkdownObject?: never;
}

type NavBarPageLeaf = NavBarBlogPage | NavBarElementPage;

type NavBarPageWithChildren = NavBarPageLeaf & { childPages: NavBarPageLeaf[] };

type NavBarPage = NavBarPageWithChildren | NavBarPageLeaf;

export { WebsiteStructure, NavBarPage, NavBarPageLeaf };
