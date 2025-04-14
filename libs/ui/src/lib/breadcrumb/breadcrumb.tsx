import React, { forwardRef, HTMLAttributes } from 'react';

export interface BreadcrumbComponentProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<never>;
}

const BreadcrumbComponent = forwardRef<HTMLDivElement, BreadcrumbComponentProps>(
  ({ ...props }, ref) => {
    return <>Breadcrumb</>;
  },
);

export const Breadcrumb = BreadcrumbComponent;
