import { createSignal, onMount } from 'solid-js';

export default function ReadingTime() {
  const [minutes, setMinutes] = createSignal(0);

  onMount(() => {
    const article = document.querySelector('.post-content');
    if (!article) return;

    const text = article.textContent || '';
    // 日本語は1文字0.5秒、英語は1単語0.3秒として計算
    const japaneseChars = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

    const readingTime = Math.ceil((japaneseChars * 0.5 + englishWords * 0.3) / 60);
    setMinutes(Math.max(1, readingTime));
  });

  return (
    <span class="reading-time">
      約 {minutes()} 分で読めます
    </span>
  );
}
