import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredSocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  socialItems?: StaggeredSocialItem[];
  logoUrl?: string;
  className?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export function StaggeredMenu({
  items,
  socialItems = [],
  logoUrl = '/Logo-White-1.png',
  className = '',
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set(panel, { xPercent: 100 });
    gsap.set(layerRefs.current, { xPercent: 100 });
  }, []);

  const openMenu = useCallback(() => {
    if (busyRef.current || openRef.current) return;
    busyRef.current = true;
    const panel = panelRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    timelineRef.current?.kill();
    const links = Array.from(panel.querySelectorAll<HTMLElement>('[data-menu-item]'));
    const socials = Array.from(panel.querySelectorAll<HTMLElement>('[data-menu-social]'));
    gsap.set(links, { yPercent: 120, rotate: 8 });
    gsap.set(socials, { y: 18, opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        openRef.current = true;
        setOpen(true);
        onMenuOpen?.();
      },
    });

    layerRefs.current.forEach((layer, index) => {
      timeline.to(layer, { xPercent: 0, duration: 0.42, ease: 'power4.out' }, index * 0.06);
    });
    timeline.to(panel, { xPercent: 0, duration: 0.58, ease: 'power4.out' }, 0.1);
    timeline.to(links, { yPercent: 0, rotate: 0, duration: 0.8, ease: 'power4.out', stagger: 0.07 }, 0.34);
    timeline.to(socials, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, 0.6);
    timelineRef.current = timeline;
  }, [onMenuOpen]);

  const closeMenu = useCallback(() => {
    if (busyRef.current || !openRef.current) return;
    busyRef.current = true;
    const panel = panelRef.current;
    if (!panel) return;

    timelineRef.current?.kill();
    const links = Array.from(panel.querySelectorAll<HTMLElement>('[data-menu-item]'));
    const socials = Array.from(panel.querySelectorAll<HTMLElement>('[data-menu-social]'));
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...links, ...socials], {
      opacity: 0,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => {
        const offscreen = gsap.timeline({
          onComplete: () => {
            busyRef.current = false;
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
          },
        });
        offscreen.to(panel, { xPercent: 100, duration: 0.32, ease: 'power3.in' });
        layerRefs.current.forEach((layer) => offscreen.to(layer, { xPercent: 100, duration: 0.26, ease: 'power3.in' }, 0));
      },
    });
  }, [onMenuClose]);

  const toggle = () => {
    if (openRef.current) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeMenu]);

  return (
    <div className={`staggered-menu-wrapper ${className}`}>
      <div ref={(node) => { if (node) layerRefs.current = Array.from(node.children) as HTMLDivElement[]; }} className="staggered-menu-layers" aria-hidden="true">
        <div className="staggered-menu-layer staggered-menu-layer-one" />
        <div className="staggered-menu-layer staggered-menu-layer-two" />
      </div>

      <header className="staggered-menu-header">
        <img src={logoUrl} alt="Rotaract Club of UCSC" className="staggered-menu-logo" />
        <button type="button" ref={toggleRef} onClick={toggle} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className="staggered-menu-toggle">
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className={`staggered-menu-plus ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <aside ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <ul className="staggered-menu-list">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <a data-menu-item href={item.link} aria-label={item.ariaLabel} onClick={closeMenu}>
                  <span className="staggered-menu-number">0{index + 1}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {socialItems.length > 0 && (
          <div className="staggered-menu-socials">
            <p>Connect</p>
            <div>
              {socialItems.map((item) => (
                <a key={item.label} data-menu-social href={item.link} target="_blank" rel="noreferrer">{item.label}</a>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default StaggeredMenu;
