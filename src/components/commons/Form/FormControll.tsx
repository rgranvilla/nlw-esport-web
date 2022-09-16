import { HTMLAttributes, PropsWithChildren } from "react";

interface FormControllProps extends HTMLAttributes<HTMLDivElement> {}

export function FormControll({ children }: FormControllProps) {
  return <div className="flex flex-col gap-2">{children}</div>;
}
