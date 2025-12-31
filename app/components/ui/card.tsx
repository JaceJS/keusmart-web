import * as React from "react";
import { cn } from "@/app/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
