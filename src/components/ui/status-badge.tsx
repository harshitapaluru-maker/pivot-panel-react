import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        PENDING: "bg-warning text-warning-foreground",
        APPROVED: "bg-info text-info-foreground", 
        PAID: "bg-success text-success-foreground",
        OPEN: "bg-muted text-muted-foreground border border-border",
      },
    },
    defaultVariants: {
      status: "PENDING",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ children, status, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={cn(statusBadgeVariants({ status }), className)}
    >
      {children}
    </Badge>
  );
}