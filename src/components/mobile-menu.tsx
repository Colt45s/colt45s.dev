import { createSignal, onMount, onCleanup, type JSX } from 'solid-js';

interface Props {
  children: JSX.Element;
}

export default function MobileMenu(props: Props) {
  const [isOpen, setIsOpen] = createSignal(false);

  const toggle = () => setIsOpen(!isOpen());
  const close = () => setIsOpen(false);

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeydown);
    onCleanup(() => document.removeEventListener('keydown', handleKeydown));
  });

  return (
    <>
      <button
        class="menu-toggle"
        onClick={toggle}
        aria-label={isOpen() ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen()}
      >
        {isOpen() ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {isOpen() && (
        <div class="mobile-menu-overlay" onClick={close}>
          <nav class="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {props.children}
          </nav>
        </div>
      )}
    </>
  );
}
