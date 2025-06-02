import React from "react";

export const Card = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="card">
    <div className="card-body">
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  </div>
);
