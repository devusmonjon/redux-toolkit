import { FunctionComponent } from "react";
import { LayoutProps } from "./layout-props";
import Navbar from "./navbar";
import Create from "../../../pages/create/create";

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="sidebar dark:bg-gray-900 overflow-y-auto h-[90vh] fixed top-[10vh] left-0">
        <Create />
      </div>
      <main className="pl-[400px] pr-[100px]">{children}</main>
    </>
  );
};

export default Layout;

// high order component
export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
