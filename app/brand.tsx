import { UsersRound } from "lucide-react";
import s from "./brand.module.css";

/** One identity across marketing and product previews; callers control size. */
export function Brand({ className = "", markClassName = "" }: { className?: string; markClassName?: string }) {
  return <span className={`${s.brand} ${className}`} data-crewzy-brand>
    <span className={`${s.mark} ${markClassName}`} aria-hidden="true"><UsersRound size={22} strokeWidth={2.2} /></span>
    <span className={s.wordmark}>Crewzy</span>
  </span>;
}
