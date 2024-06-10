// const postLink = document.getElementById('postPreview');
// postLink.addEventListener('click', () => {
//     //abrir card
// })



const addPost = async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;
    

    if (postTitle && postContent) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                content: postContent
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(`Failed to add post`);
        }
    }
}

document.getElementById('modal-post-form').addEventListener('submit', addPost);
