import Notepad from './notepad-model';
import {
    getRefs
} from './refs';
import noteTemplate from './../templates/note.hbs'

const refs = getRefs();

export const createNoteCard = ({
    ...note
}) => {
    note.priority = Notepad.getPriorityName(note.priority);
    return noteTemplate(note);
};

export const createListItemsMarkup = notes => {
    const markup = notes.map(note => createNoteCard(note));
    refs.listRef.innerHTML = "";
    refs.listRef.insertAdjacentHTML('beforeend', markup.join(''));
};

export const addListItem = (listRef, note) => {
    const newListItem = createNoteCard(note);
    listRef.insertAdjacentHTML('beforeend', newListItem);;
};