document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('toolSearch');
  const toolCards = document.querySelectorAll('.tool-card');
  const dropzone = document.getElementById('quickDropzone');

  // Instant tool filtering
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    toolCards.forEach((card) => {
      const title = card.getAttribute('data-title') || '';
      const text = card.innerText.toLowerCase();

      if (text.includes(query) || title.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Dropzone click -> opens main workspace
  dropzone.addEventListener('click', () => {
    window.open('https://pdfarenaarc.com', '_blank');
  });
});
