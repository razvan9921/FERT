function toggleHiddenClass(id) {
    document.getElementById(id).classList.toggle("hidden");
}

function rotateIcon(id) {
    document.getElementById(id).classList.toggle("down");
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle("visibility-menu");
}

function loadElements(list) {
    list.forEach(element => {
        var link = document.querySelector(`link[id="${element}File"]`);
        var template = link.import.querySelector('template');
        var clone = document.importNode(template.content, true);
        document.querySelector(`#${element}`).appendChild(clone);
    });
}