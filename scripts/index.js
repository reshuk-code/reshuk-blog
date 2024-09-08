const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[type="search"]');
const postsContainer = document.getElementById('posts-container');

// Function to render posts
function renderPosts(postsToRender) {
    postsContainer.innerHTML = '';  // Clear previous content
    if (!Array.isArray(postsToRender) || postsToRender.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
    } else {
        postsToRender.forEach((post, index) => {
            if (post && post.title && post.content) {
                const highlightedContent = highlightSearchTerm(post.content);
                const truncatedContent = truncateContent(post.content);
                const imageHTML = post.imageSrc ? `<img src="${post.imageSrc}" alt="${post.title}" class="img-fluid">` : '';

                postsContainer.innerHTML += `
                    <div class="post mb-4">
                        <h3>${post.title}</h3>
                        ${imageHTML}
                        <p>${truncatedContent} <span class="see-more-btn" data-index="${index}">See More</span></p>
                        <p class="full-content">${post.content}</p>
                        <hr>
                    </div>
                `;
            }
        });
    }
}

// Function to highlight search term
function highlightSearchTerm(text) {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return text;  // Return original text if search term is empty
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Function to truncate content
function truncateContent(content) {
    const maxWords = 110;
    const words = content.split(' ');
    if (words.length <= maxWords) return content;
    return words.slice(0, maxWords).join(' ') + '...';
}

// Function to handle search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    const posts = JSON.parse(localStorage.getItem('user-posts')) || [];
    
    // Ensure posts is an array
    if (!Array.isArray(posts)) {
        console.error('Posts data is not an array');
        return;
    }

    // Filter posts based on search term
    const filteredPosts = posts.filter(post => 
        (post.title && post.title.toLowerCase().includes(searchTerm)) || 
        (post.content && post.content.toLowerCase().includes(searchTerm))
    );
    renderPosts(filteredPosts);  // Render filtered posts
}

// Event listener for "See More" button
postsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('see-more-btn')) {
        const index = event.target.getAttribute('data-index');
        const fullContentElement = event.target.closest('.post').querySelector('.full-content');
        if (fullContentElement) {
            const isCurrentlyVisible = !fullContentElement.classList.contains('d-none');
            fullContentElement.classList.toggle('d-none', isCurrentlyVisible);
            event.target.textContent = isCurrentlyVisible ? 'See More' : 'See Less';
        }
    }
});

// Initialize by rendering all posts
const allPosts = JSON.parse(localStorage.getItem('user-posts')) || [];
renderPosts(allPosts);

// Search form event listener
searchForm.addEventListener('submit', handleSearch);

// Optional: Real-time search (debouncing)
let debounceTimer;
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => handleSearch(new Event('submit')), 300);  // Delay 300ms before searching
});
