import {
    ICON_TYPES,
    NOTE_ACTIONS
} from './utils/constants';
import initialNotes from './../assets/notes';
import Notepad from './notepad-model'
import {
    getRefs
} from './refs'


const notepad = new Notepad(initialNotes);
const refs = getRefs();

export const createNoteContent = (title, body) => {
    const noteContent = document.createElement('div');
    noteContent.classList.add('note__content');

    const noteTitle = document.createElement('h2');
    noteTitle.classList.add('note__title');
    noteTitle.textContent = title;

    const noteBody = document.createElement('p');
    noteBody.classList.add('note__body');
    noteBody.textContent = body;

    noteContent.appendChild(noteTitle);
    noteContent.appendChild(noteBody);

    return noteContent;
}

export const createNoteFooter = priority => {
    const noteFooter = document.createElement('footer');
    noteFooter.classList.add('note__footer');

    const noteSection1 = document.createElement('section');
    noteSection1.classList.add('note__section');

    const notePriority = document.createElement('span');
    notePriority.classList.add('note__priority');

    notePriority.textContent = `Priority: ${Notepad.getPriorityName(priority)}`;

    const noteSection2 = document.createElement('section');
    noteSection1.classList.add('note__section');

    noteFooter.appendChild(noteSection1);
    noteFooter.appendChild(noteSection2);
    noteSection1.appendChild(
        createActionButton(ICON_TYPES.ARROW_UP, NOTE_ACTIONS.INCREASE_PRIORITY)
    );
    noteSection1.appendChild(
        createActionButton(ICON_TYPES.ARROW_DOWN, NOTE_ACTIONS.DECREASE_PRIORITY)
    );
    noteSection2.appendChild(
        createActionButton(ICON_TYPES.EDIT, NOTE_ACTIONS.EDIT)
    );
    noteSection2.appendChild(
        createActionButton(ICON_TYPES.DELETE, NOTE_ACTIONS.DELETE)
    );
    noteSection1.appendChild(notePriority);

    return noteFooter;
}

export const createActionButton = (ICON_TYPES, NOTE_ACTIONS) => {
    const actionButton = document.createElement('button');
    actionButton.classList.add('action');
    actionButton.setAttribute('data-action', NOTE_ACTIONS);

    const actionIcon = document.createElement('i');
    actionIcon.classList.add('material-icons', 'action__icon');
    actionIcon.textContent = ICON_TYPES;

    actionButton.appendChild(actionIcon);

    return actionButton;
}

export const createListItem = ({
    id,
    title,
    body,
    priority
}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('note-list__item');
    listItem.dataset.id = id;

    const note = document.createElement('div');
    note.classList.add('note');

    listItem.appendChild(note);
    note.appendChild(createNoteContent(title, body));
    note.appendChild(createNoteFooter(priority));

    return listItem;
}

export const renderNoteList = (listRef, notes) => {
    const renderNotes = notes.map(note => createListItem(note));

    listRef.innerHTML = '';
    listRef.append(...renderNotes);

    return listRef;
}

renderNoteList(refs.listRef, notepad.notes);

export const addListItem = (listRef, head, text) => {
    const newListItem = createListItem(head, text);

    listRef.appendChild(newListItem);
};