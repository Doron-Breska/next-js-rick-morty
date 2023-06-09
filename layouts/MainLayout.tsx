import React, { ReactNode } from "react";

type Props = { children: ReactNode; contentStyle?: string };

const MainLayout = (props: Props) => {
  return <div style={{ backgroundColor: "#eee9dc" }}>{props.children}</div>;
};

export default MainLayout;
