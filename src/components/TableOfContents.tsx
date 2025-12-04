import { createSignal, onMount, onCleanup, For, Show } from 'solid-js';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = createSignal<Heading[]>([]);
  const [activeId, setActiveId] = createSignal<string>('');
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(() => {
    const article = document.querySelector('.post-content');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    const items: Heading[] = [];

    elements.forEach((el, index) => {
      if (!el.id) {
        el.id = `heading-${index}`;
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    onCleanup(() => observer.disconnect());
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <Show when={headings().length > 0}>
      <nav class="toc">
        <button class="toc-toggle" onClick={() => setIsOpen(!isOpen())}>
          目次 {isOpen() ? '−' : '+'}
        </button>
        <Show when={isOpen()}>
          <ul class="toc-list">
            <For each={headings()}>
              {(heading) => (
                <li
                  class={`toc-item toc-level-${heading.level}`}
                  classList={{ active: activeId() === heading.id }}
                >
                  <a href={`#${heading.id}`} onClick={(e) => { e.preventDefault(); scrollTo(heading.id); }}>
                    {heading.text}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </nav>
    </Show>
  );
}
