let posts = JSON.parse(localStorage.getItem('user-posts')) || [];

const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postIdInput = document.getElementById('post-id');
const userPostsDiv = document.getElementById('user-posts');

// Function to render posts
function renderPosts() {
    userPostsDiv.innerHTML = '';
    posts.forEach((post, index) => {
        userPostsDiv.innerHTML += `
            <div>
                <p>${post.content}</p>
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            </div>
            <hr>
        `;
    });
}

// Function to add or edit a post
postForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const postContentValue = postContent.value;
    const postId = postIdInput.value;

    if (postId === '') {
        // Adding a new post
        posts.push({ content: postContentValue });
    } else {
        // Editing an existing post
        posts[postId].content = postContentValue;
    }

    localStorage.setItem('user-posts', JSON.stringify(posts));
    renderPosts();
    postForm.reset(); // Clear form after submit
});

// Edit Post Function
function editPost(index) {
    postContent.value = posts[index].content;
    postIdInput.value = index; // Store the post's ID for editing
}

// Delete Post Function
function deletePost(index) {
    posts.splice(index, 1); // Remove post
    localStorage.setItem('user-posts', JSON.stringify(posts));
    renderPosts(); // Re-render posts
}

// Initialize by rendering posts
renderPosts();