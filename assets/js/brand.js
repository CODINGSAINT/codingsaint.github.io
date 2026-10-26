(() => {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const current = () => document.documentElement.dataset.theme || (system.matches ? 'dark' : 'light');
  const update = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} theme`);
    button.querySelector('.theme-label').textContent = next === 'light' ? 'Light' : 'Dark';
  };
  button.hidden = false;
  update();
  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('codingsaint-theme', next); } catch (e) {}
    update();
  });
  system.addEventListener('change', update);
})();
