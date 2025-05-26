document.addEventListener('DOMContentLoaded', () => {
    // Initialize GLightbox for videos
    // The selector targets elements with the 'glightbox' class and a 'data-glightbox' attribute containing 'type: video'
    const videoLightbox = GLightbox({
        selector: '.glightbox[data-glightbox="type: video"]',
        videos: {
            youtube: {
                autoplay: true, // Auto-play YouTube videos
                nocookie: true // Use YouTube's no-cookie domain for privacy
            },
            vimeo: {
                autoplay: true, // Auto-play Vimeo videos
                nocookie: true // Use Vimeo's no-cookie domain for privacy
            }
        }
    });

    // Initialize GLightbox for images
    // The selector targets elements with the 'glightbox' class but WITHOUT the 'data-glightbox' attribute for video
    const imageLightbox = GLightbox({
        selector: '.glightbox:not([data-glightbox="type: video"])'
    });

    // Gallery Filtering Logic
    const portfolioFilters = document.querySelectorAll('.portfolio-flters li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove 'filter-active' class from all filters
            portfolioFilters.forEach(f => f.classList.remove('filter-active'));
            // Add 'filter-active' class to the clicked filter
            this.classList.add('filter-active');

            // Get the filter value (e.g., '*', '.filter-videos', '.filter-images')
            const filterValue = this.getAttribute('data-filter');

            // Iterate over all portfolio items
            portfolioItems.forEach(item => {
                // If the filter is '*' (show all) or the item has the class corresponding to the filter
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });
});