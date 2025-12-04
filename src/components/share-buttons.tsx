import { createSignal, onMount } from 'solid-js';

interface Props {
  title: string;
}

export default function ShareButtons(props: Props) {
  const [copied, setCopied] = createSignal(false);
  const [url, setUrl] = createSignal('');

  onMount(() => {
    setUrl(window.location.href);
  });

  const shareToX = () => {
    const text = encodeURIComponent(props.title);
    const shareUrl = encodeURIComponent(url());
    window.open(`https://x.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class="share-buttons">
      <button onClick={shareToX} class="share-btn" title="Xでシェア">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      <button onClick={copyLink} class="share-btn" title={copied() ? "コピーしました" : "リンクをコピー"}>
        {copied() ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        )}
      </button>
    </div>
  );
}
