// Example JavaScript for handling form submission and displaying uploaded content
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const imageContainer = document.getElementById('imageContainer');

    uploadForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            // Assuming imageUrl is returned from backend
            const imageUrl = data.imageUrl;

            // Create image element and append to imageContainer
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = 'Uploaded Image';
            imageContainer.appendChild(imageElement);

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    });
});
