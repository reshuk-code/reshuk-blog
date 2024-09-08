const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = titleInput.value;
    const content = contentInput.value;
    const imageFile = imageInput.files[0];

    if (title && content) {
        savePost(title, content, imageFile);
        alert('Post uploaded successfully!');
        form.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

function savePost(title, content, imageFile) {
    let posts = JSON.parse(localStorage.getItem('user-posts')) || [];

    const reader = new FileReader();
    reader.onloadend = function() {
        const imageSrc = reader.result;
        posts.push({ title, content, imageSrc });
        localStorage.setItem('user-posts', JSON.stringify(posts));
    };
    
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onloadend();
    }
}