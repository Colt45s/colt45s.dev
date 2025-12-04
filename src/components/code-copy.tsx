import { onMount } from 'solid-js';

export default function CodeCopy() {
  onMount(() => {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.setAttribute('aria-label', 'コードをコピー');
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      `;

      button.addEventListener('click', async () => {
        const code = block.querySelector('code')?.textContent || block.textContent || '';
        await navigator.clipboard.writeText(code);

        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        `;

        setTimeout(() => {
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          `;
        }, 2000);
      });

      wrapper.appendChild(button);
    });
  });

  return null;
}
