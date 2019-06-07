import {
    NOTE_ACTIONS
} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from './../assets/notes';
import {
    getRefs
} from './refs';
import {
    addListItem,
    renderNoteList
} from './view';


const notepad = new Notepad(initialNotes);
const refs = getRefs();

const handleEditorSubmit = event => {
    event.preventDefault();

    const [input, textarea] = event.currentTarget.elements;
    const inputValue = input.value;
    const bodyValue = textarea.value;

    if (inputValue.trim() === '' || bodyValue.trim() === '') {
        return alert('Необходимо заполнить все поля!');
    }

    const savedNote = notepad.saveNote(inputValue, bodyValue);
    addListItem(refs.listRef, savedNote);
    event.currentTarget.reset();
};

const handleFilterChange = event => {
    const filteredNotes = notepad.filterNotesByQuery(event.target.value);

    renderNoteList(refs.listRef, filteredNotes);
};

const handleListClick = ({
    target
}) => {
    if (target.nodeName !== 'I') return;

    const action = target.parentNode.dataset.action;

    switch (action) {
        case NOTE_ACTIONS.DELETE:
            const parentListItem = target.parentNode.closest('.note-list__item');
            const id = parentListItem.dataset.id;
            notepad.deleteNote(id);
            parentListItem.remove();
            console.log(notepad._notes);
            break;

        case NOTE_ACTIONS.EDIT:
            console.log('edit');
            break;

        case NOTE_ACTIONS.INCREASE_PRIORITY:
            console.log('increase priority');
            break;

        case NOTE_ACTIONS.DECREASE_PRIORITY:
            console.log('decrease priority');
            break;
        default:
            console.log('noAction');
    }
};

refs.editor.addEventListener('submit', handleEditorSubmit);
refs.search.addEventListener('input', handleFilterChange);
refs.listRef.addEventListener('click', handleListClick);