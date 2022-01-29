interface WebsiteStructure {
  navBarPages: NavBarPage[];
}

interface NavBarPageProperties {
  navBarButtonLabel: string;
  pageURL: string;
  importedMarkdownObject?: string;
  element?: JSX.Element;
  childPages?: NavBarPage[];
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

type NavBarPageWithChildren = NavBarPageLeaf &
  Required<Pick<NavBarPageProperties, 'childPages'>>;

type NavBarPage = NavBarPageLeaf | NavBarPageWithChildren;

export { WebsiteStructure };
