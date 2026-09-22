import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold tracking-tight select-none whitespace-nowrap rounded-md outline-none focus-visible:ring-2 focus-visible:ring-stone/50 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "btn-lift bg-stone text-stone-fg hover:bg-fg",
        ghost: "btn-lift bg-transparent text-fg shadow-border hover:bg-raised",
        ink: "btn-lift bg-bg text-fg hover:bg-raised",
        quiet: "text-muted hover:text-fg underline-offset-4 hover:underline",
      },
      size: {
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        sm: "h-9 px-3.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
