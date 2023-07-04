declare namespace Docs {
  namespace V2 {
    type SidebarCategory = {
      is_directory: boolean;
      label: string;
      path: string;
      paths: SidebarCategory[];
    };

    type State = {
      darkMode?: string;
      mobileViewport?: boolean;
      setSideBarOpen?: (value: boolean) => void;
      toggleDarkMode?: () => void;
    }
  }
}
