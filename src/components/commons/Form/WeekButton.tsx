import { ButtonHTMLAttributes } from "react";

interface WeekButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  weekDay: string;
}

export function WeekButton({ weekDay }: WeekButtonProps) {
  const firstLetter = weekDay.substring(0, 1);
  return (
    <button title={weekDay} className="w-8 h-8 rounded bg-zinc-900">
      {firstLetter}
    </button>
  );
}
