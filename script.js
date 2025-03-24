// Your code here.
// Select all items (cubes)
const items = document.querySelectorAll('.item');

items.forEach(item => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    // When mouse is pressed, start dragging
    item.addEventListener('mousedown', (event) => {
        isDragging = true;

        // Get mouse position relative to the item
        offsetX = event.clientX - item.offsetLeft;
        offsetY = event.clientY - item.offsetTop;

        // Ensure the item is on top
        item.style.zIndex = 1000;

        // Add event listeners for movement and release
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Function to handle movement
    function onMouseMove(event) {
        if (!isDragging) return;

        // Calculate new position
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Restrict movement within the container (boundary handling)
        const container = document.querySelector('.items');
        const maxX = container.offsetWidth - item.offsetWidth;
        const maxY = container.offsetHeight - item.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        // Apply new position
        item.style.position = 'absolute';
        item.style.left = `${newX}px`;
        item.style.top = `${newY}px`;
    }

    // Function to stop dragging
    function onMouseUp() {
        isDragging = false;

        // Remove event listeners to stop movement
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});
