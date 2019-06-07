export const getRefs = () => ({
    listRef: document.querySelector('.note-list'),
    editor: document.querySelector('.note-editor'),
    search: document.querySelector('.search-form'),
    openEditor: document.querySelector('[data-action="open-editor"]'),
    editNote: document.querySelector('[data-action="edit-note"]'),
    note: document.querySelector('.note-list__item')
})