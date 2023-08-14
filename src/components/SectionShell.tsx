import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionShell = ({ children, className, ...props }: SectionShellProps) => {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  );
};

export default SectionShell;
