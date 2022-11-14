var onMultiSelectToggle = function onMultiSelectToggle(filterHeaderElement) {
    var header = filterHeaderElement;
    var sibling = filterHeaderElement.nextElementSibling;
    
    if(header && sibling.classList.contains("multi-select-children-container")) {
        sibling.classList.toggle("multiselect-open");
        header.classList.toggle('closed');

        var childrenShouldDissapear = header.classList.contains('closed');
        var children = sibling.childNodes;

        children.forEach(function(element) {
            if(element.nodeType === Node.ELEMENT_NODE) {
                if(childrenShouldDissapear) {
                    element.style.display = 'none';
                } else {
                    element.style.display = 'block';
                }
            }
        });
        return;
    }
}