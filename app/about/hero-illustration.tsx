import { BriefcaseBusiness, CalendarClock, Check, FileClock, History, UserRound, UsersRound } from "lucide-react";
import s from "./about.module.css";

/** A vector brand illustration, rather than an interface or customer record. */
export function AboutHeroIllustration() {
  return (
    <figure className={s.heroVisual}>
      <svg viewBox="0 0 560 500" role="img" aria-label="Crewzy connects employee lifecycle workflows, everyday requests and approvals, document expiry tracking and audit history." focusable="false">
        <rect x="68" y="91" width="420" height="322" rx="46" transform="rotate(-7 278 252)" className={s.artWorkspaceBack} />
        <rect x="86" y="109" width="400" height="292" rx="40" className={s.artWorkspaceFront} />

        <g>
          <rect x="16" y="24" width="258" height="152" rx="20" className={s.artCard} />
          <rect x="34" y="42" width="40" height="40" rx="12" className={s.artIconTile} />
          <g transform="translate(42 50)" className={s.artBlue}><UsersRound width={24} height={24} strokeWidth={1.8} /></g>
          <text x="88" y="69" className={s.artTitle}>People</text>
          <text x="35" y="107" className={s.artCaption}>Employee lifecycle</text>
          <path d="M51 143H132" className={s.artAvatarRail} />
          {[51, 91, 131].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy="143" r="17" className={index === 1 ? s.artAvatarDark : s.artAvatar} />
              <g transform={`translate(${x - 9} 134)`} className={index === 1 ? s.artWhite : s.artBlue}><UserRound width={18} height={18} strokeWidth={1.8} /></g>
            </g>
          ))}
          <text x="159" y="149" className={s.artSmallLabel}>Onboarding</text>
        </g>

        <g>
          <rect x="318" y="46" width="224" height="150" rx="20" className={s.artCard} />
          <g transform="translate(336 66)" className={s.artBlue}><BriefcaseBusiness width={24} height={24} strokeWidth={1.8} /></g>
          <text x="370" y="85" className={s.artWorkTitle}>Everyday work</text>
          <rect x="336" y="106" width="188" height="32" rx="8" className={s.artRow} />
          <rect x="336" y="147" width="188" height="32" rx="8" className={s.artRow} />
          <g transform="translate(346 114)" className={s.artBlue}><Check width={17} height={17} strokeWidth={2.2} /></g>
          <g transform="translate(346 155)" className={s.artBlue}><Check width={17} height={17} strokeWidth={2.2} /></g>
          <text x="374" y="128" className={s.artRowLabel}>Requests</text>
          <text x="374" y="169" className={s.artRowLabel}>Approvals</text>
        </g>

        <g>
          <rect x="172" y="208" width="216" height="112" rx="23" className={s.artHub} />
          <rect x="192" y="229" width="44" height="44" rx="13" className={s.artBrandTile} />
          <g transform="translate(201 238)" className={s.artWhite}><UsersRound width={26} height={26} strokeWidth={1.9} /></g>
          <text x="250" y="263" className={s.artWordmark}>Crewzy</text>
          <text x="192" y="296" className={s.artHubCaption}>One connected workspace</text>
        </g>

        <g>
          <rect x="254" y="350" width="290" height="130" rx="20" className={s.artCard} />
          <rect x="274" y="367" width="32" height="32" rx="9" className={s.artIconTile} />
          <g transform="translate(281 374)" className={s.artBlue}><FileClock width={19} height={19} strokeWidth={1.8} /></g>
          <text x="318" y="390" className={s.artTitle}>Compliance</text>
          <text x="274" y="418" className={s.artCaption}>Document expiry tracking</text>
          <rect x="274" y="432" width="250" height="30" rx="8" className={s.artRow} />
          <g transform="translate(284 438)" className={s.artBlue}><CalendarClock width={18} height={18} strokeWidth={1.8} /></g>
          <text x="313" y="453" className={s.artRowLabel}>Renewals</text>
        </g>

        <g>
          <rect x="26" y="378" width="194" height="68" rx="18" className={s.artCard} />
          <g transform="translate(42 399)" className={s.artBlue}><History width={24} height={24} strokeWidth={1.8} /></g>
          <text x="78" y="405" className={s.artAuditTitle}>Audit history</text>
          <text x="78" y="428" className={s.artSmallLabel}>Recorded changes</text>
        </g>
      </svg>
    </figure>
  );
}
