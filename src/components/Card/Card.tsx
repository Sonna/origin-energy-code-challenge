import React from "react";

import {
  buildDataAttributes,
  DataAttributeMap,
} from "../DesignSystem/buildDataAttributes";

interface Props {
  title?: string;
  data?: DataAttributeMap;
  children: React.ReactNode;
}

export const Card = ({ title, data, children }: Props) => {
  return (
    <div className="card" {...buildDataAttributes(data)}>
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
