document.addEventListener('DOMContentLoaded', () => {
    // Business Card Interaction
    const cards = document.querySelectorAll('.business-card-img');

    cards.forEach(card => {
        card.addEventListener('click', function () {
            // Store original src if not already stored
            if (!this.dataset.originalSrc) {
                this.dataset.originalSrc = this.src;
            }

            // Swap sources if altSrc exists
            if (this.dataset.altSrc) {
                if (this.src === this.dataset.originalSrc) {
                    this.src = this.dataset.altSrc;
                } else {
                    this.src = this.dataset.originalSrc;
                }
            }
        });
    });
});

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Satoshi', 'sans-serif'],
                display: ['Satoshi', 'sans-serif'],
                body: ['Satoshi', 'sans-serif'],
                mono: ['Satoshi', 'monospace'],
            },
            colors: {
                dark: '#0a0a0a',
                accent: '#C1121F', /* Brand Secondary Red */
                primary: '#45206B', /* Brand Primary Purple */
                secondary: '#bfb8e6', /* Soft Lavender for contrast */
            },
        }
    }
}
