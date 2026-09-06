const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-typewriter]').forEach((line) => {
  const output = line.querySelector('[data-typewriter-output]');
  const message = line.dataset.typewriter || '';
  if (!output) return;

  if (reducedMotion) {
    output.textContent = message;
    return;
  }

  output.textContent = '';
  let character = 0;
  const typeCharacter = () => {
    character += 1;
    output.textContent = message.slice(0, character);
    if (character < message.length) window.setTimeout(typeCharacter, 82);
  };
  window.setTimeout(typeCharacter, 850);
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
