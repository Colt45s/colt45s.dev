import { createSignal, For, Show } from 'solid-js';

interface Post {
  id: string;
  title: string;
  description?: string;
}

interface Props {
  posts: Post[];
}

export default function Search(props: Props) {
  const [query, setQuery] = createSignal('');
  const [isOpen, setIsOpen] = createSignal(false);

  const filteredPosts = () => {
    const q = query().toLowerCase();
    if (!q) return [];
    return props.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.description?.toLowerCase().includes(q) ?? false)
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div class="search-container">
      <button
        class="search-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="検索"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>

      <Show when={isOpen()}>
        <div class="search-overlay" onClick={() => { setIsOpen(false); setQuery(''); }}>
          <div class="search-modal" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="記事を検索..."
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              autofocus
              class="search-input"
            />
            <Show when={query().length > 0}>
              <ul class="search-results">
                <For each={filteredPosts()} fallback={<li class="no-results">見つかりませんでした</li>}>
                  {(post) => (
                    <li>
                      <a href={`/blog/${post.id}`}>
                        <span class="result-title">{post.title}</span>
                        {post.description && <span class="result-desc">{post.description}</span>}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}
