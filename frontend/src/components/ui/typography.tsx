import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-3xl font-semibold md:text-6xl", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("text-3xl font-semibold md:text-5xl", className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("text-3xl font-semibold", className)}>{children}</h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return <h4 className={cn("text-xl font-semibold", className)}>{children}</h4>;
}

export function H5({ children, className }: TypographyProps) {
  return <h5 className={cn("text-lg font-semibold", className)}>{children}</h5>;
}

export function H6({ children, className }: TypographyProps) {
  return (
    <h6
      className={cn(
        "text-n800 text-sm font-semibold tracking-widest uppercase",
        className,
      )}
    >
      {children}
    </h6>
  );
}

export function Base({ children, className }: TypographyProps) {
  return <div className={cn("text-base", className)}>{children}</div>;
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}

export function Code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        "bg-n75 font-code text-n900 rounded px-1 py-0.5 text-sm",
        className,
      )}
    >
      {children}
    </code>
  );
}
