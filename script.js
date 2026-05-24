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
                dark: '#323232',
                light: '#f5f5f5',
                accent: '#C1121F', 
                primary: '#45206B', 
                secondary: '#C1121F', 
            },
        }
    }
}
