var onMultiSelectToggle = function onMultiSelectToggle(filterHeaderElement) {
    var header = filterHeaderElement;
    var sibling = filterHeaderElement.nextElementSibling;
    
    if(header && header.classList.contains('filter-header') && sibling.classList.contains("multi-select-children-container")) {
        return header.classList.toggle('closed');
    }
}