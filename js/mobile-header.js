// Mobile Header Behavior
document.addEventListener('DOMContentLoaded', function() {
    // Get header element
    const header = document.querySelector('header');

    // Variables for scroll detection
    let lastScrollTop = 0;
    let ticking = false;

    // Function to handle header visibility
    function updateHeaderVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add background color directly when not at the top
        if (scrollTop > 10) {
            // Apply background color directly with inline styles
            header.style.backgroundColor = 'rgba(7, 19, 142, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            // Remove background color at the top
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }

        // Always show header at the top of the page
        if (scrollTop <= 10) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            return;
        }

        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }

        // Update last scroll position
        lastScrollTop = scrollTop;
        ticking = false;
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateHeaderVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize header visibility
    updateHeaderVisibility();

    // Force background color if we're not at the top of the page on load
    if (window.pageYOffset > 10 || document.documentElement.scrollTop > 10) {
        header.style.backgroundColor = 'rgba(7, 19, 142, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }

    // Also check after a short delay to ensure proper initialization
    setTimeout(function() {
        updateHeaderVisibility();
        // Double-check background color
        if (window.pageYOffset > 10 || document.documentElement.scrollTop > 10) {
            header.style.backgroundColor = 'rgba(7, 19, 142, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    }, 100);

    setTimeout(updateHeaderVisibility, 500);

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(updateHeaderVisibility, 300);
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        setTimeout(updateHeaderVisibility, 200);
    });
});
