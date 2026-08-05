import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "primary" | "secondary";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      containerSize = "lg",
      spacing = "lg",
      background = "white",
      children,
      ...props
    },
    ref,
  ) => {
    const spacingClasses = {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32",
    };

    const backgroundClasses = {
      white: "bg-white",
      gray: "bg-secondary-50",
      primary: "bg-primary-50",
      secondary: "bg-secondary-900 text-white",
    };

    return (
      <section
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          backgroundClasses[background],
          className,
        )}
        {...props}>
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  },
);

Section.displayName = "Section";

export { Section };
