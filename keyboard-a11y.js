document.addEventListener('DOMContentLoaded', () => {
  const nodesGroup = document.getElementById('topologyNodes');
  if (!nodesGroup) return;

  // Ensure newly added nodes are focusable and support keyboard activation
  const makeFocusable = (el) => {
    if (el.tagName.toLowerCase() === 'circle') {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      el.classList.add('node-interactive');
      if (!el._kbAttached) {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          }
        });
        el.addEventListener('focus', () => el.classList.add('focused'));
        el.addEventListener('blur', () => el.classList.remove('focused'));
        el._kbAttached = true;
      }
    }
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((n) => {
        if (n.nodeType === Node.ELEMENT_NODE) {
          if (n.tagName.toLowerCase() === 'circle') makeFocusable(n);
          else n.querySelectorAll && n.querySelectorAll('circle').forEach(makeFocusable);
        }
      });
    });
  });

  observer.observe(nodesGroup, { childList: true, subtree: true });

  // Initial pass
  nodesGroup.querySelectorAll('circle').forEach(makeFocusable);

  // Allow keyboard navigation between nodes using Arrow keys within the graph
  const svg = document.getElementById('topologyGraph');
  if (svg) {
    svg.addEventListener('keydown', (e) => {
      const focusable = Array.from(nodesGroup.querySelectorAll('circle'));
      if (!focusable.length) return;
      const idx = focusable.indexOf(document.activeElement);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = focusable[(idx + 1) % focusable.length];
        next && next.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = focusable[(idx - 1 + focusable.length) % focusable.length];
        prev && prev.focus();
      }
    });
  }
});
