import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

interface Props {
  links: NavLink[];
  currentPath: string;
}

export default function MobileMenu({ links, currentPath }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center"
      >
        {open ? (
          /* X icon */
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="var(--body)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          /* Hamburger icon */
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="var(--body)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-(--n200) bg-(--background) px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer noopener' : undefined}
                aria-current={currentPath === link.href ? 'page' : undefined}
                className="text-base font-medium text-(--n900) hover:text-(--body)"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-(--n200) pt-4 flex gap-3">
              <a href="/news" className="btn-secondary text-sm">News</a>
              <a href="/download" className="btn-primary text-sm">Download</a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
