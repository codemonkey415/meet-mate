import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:py-10 lg:px-8">
      {children}
    </div>
  );
}
