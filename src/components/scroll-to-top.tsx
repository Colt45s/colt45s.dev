import { createSignal, onMount, onCleanup, Show } from 'solid-js';

export default function ScrollToTop() {
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    onCleanup(() => window.removeEventListener('scroll', handleScroll));
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Show when={visible()}>
      <button onClick={scrollToTop} class="scroll-to-top" aria-label="トップに戻る">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </Show>
  );
}
