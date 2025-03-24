document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.item');
    const container = document.querySelector('.items');

    items.forEach(item => {
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        item.addEventListener('mousedown', (event) => {
            isDragging = true;

            // Get initial cursor position relative to the item
            const rect = item.getBoundingClientRect();
            offsetX = event.clientX - rect.left;
            offsetY = event.clientY - rect.top;

            // Ensure the item is on top
            item.style.zIndex = 1000;

            // Add event listeners to track movement
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(event) {
            if (!isDragging) return;

            // Get the container and its boundaries
            const containerRect = container.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            // Calculate new position
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;

            // Restrict movement within the container
            if (newX < containerRect.left) newX = containerRect.left;
            if (newY < containerRect.top) newY = containerRect.top;
            if (newX + itemRect.width > containerRect.right) newX = containerRect.right - itemRect.width;
            if (newY + itemRect.height > containerRect.bottom) newY = containerRect.bottom - itemRect.height;

            // Apply new position
            item.style.position = 'absolute';
            item.style.left = `${newX - containerRect.left}px`;
            item.style.top = `${newY - containerRect.top}px`;
        }

        function onMouseUp() {
            isDragging = false;
            item.style.zIndex = 1; // Reset z-index

            // Remove event listeners after dragging ends
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
});
