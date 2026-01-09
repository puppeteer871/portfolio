document.addEventListener('DOMContentLoaded', () => {
    // Business Card Interaction
    const cards = document.querySelectorAll('.business-card-img');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            // Store original src if not already stored
            if (!this.dataset.originalSrc) {
                this.dataset.originalSrc = this.src;
            }

            // Swap sources
            if (this.src === this.dataset.originalSrc) {
                this.src = this.dataset.altSrc;
            } else {
                this.src = this.dataset.originalSrc;
            }
        });
    });
});

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                dark: '#0a0a0a',
                accent: '#ff0000', /* Red */
                secondary: '#bfb8e6', /* Soft Lavender for contrast */
            },
        }
    }
}
