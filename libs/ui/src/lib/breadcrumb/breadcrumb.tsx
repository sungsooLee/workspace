import React, { forwardRef, HTMLAttributes } from 'react';

import * as Primitive from '../shadcn/breadcrumb';

export interface BreadcrumbComponentProps extends HTMLAttributes<HTMLDivElement> {
  items?: Array<never>;
}

const BreadcrumbComponent = forwardRef<
  React.ElementRef<typeof Primitive.Breadcrumb>,
  React.ComponentPropsWithoutRef<typeof Primitive.Breadcrumb>
>(({ ...props }) => {
  return (
    <Primitive.Breadcrumb>
      <Primitive.BreadcrumbList>
        <Primitive.BreadcrumbItem>
          <Primitive.BreadcrumbLink href="/">Home</Primitive.BreadcrumbLink>
        </Primitive.BreadcrumbItem>
        <Primitive.BreadcrumbSeparator />
        <Primitive.BreadcrumbItem>
          <Primitive.BreadcrumbLink href="/components">Components</Primitive.BreadcrumbLink>
        </Primitive.BreadcrumbItem>
        <Primitive.BreadcrumbSeparator />
        <Primitive.BreadcrumbItem>
          <Primitive.BreadcrumbPage>Breadcrumb</Primitive.BreadcrumbPage>
        </Primitive.BreadcrumbItem>
      </Primitive.BreadcrumbList>
    </Primitive.Breadcrumb>
  )
})

export const Breadcrumb = BreadcrumbComponent
