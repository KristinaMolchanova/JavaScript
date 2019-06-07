'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [{
    id: 1,
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  // Возвращает все заметки
  get notes() {
    return this._notes;
  }

  // Ищет заметку в массиве notes
  findNoteById(id) {
    let note = this._notes.find(note => note.id === id);
    return note;
  }

  //Генерирует рандомный id
  static generateUniqueId = () =>
    Math.random()
    .toString(36)
    .substring(2, 15) +
    Math.random()
    .toString(36)
    .substring(2, 15);

  // Сохраняет заметку в массив notes
  saveNote(head, text) {
    const newNote = {
      id: Notepad.generateUniqueId(),
      title: head,
      body: text,
      priority: PRIORITY_TYPES.LOW,
    };

    this._notes.push(newNote);
    return newNote;
  }

  // Удаляет заметку по идентификатору из массива notes
  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id != id);
  }

  // Обновляет контент заметки
  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);

    const keys = Object.keys(updatedContent);

    for (let key of keys) {
      note[key] = updatedContent[key];
    }
    return note;
  }

  // Обновляет приоритет заметки
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);

    if (!note) return;

    note.priority = priority;

    return note;
  }

  // Фильтрует массив заметок по подстроке query
  filterNotesByQuery(query = '') {
    const filteredNotesByQuery = this._notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase()))

    return filteredNotesByQuery;
  }

  // Фильтрует массив заметок по значению приоритета
  filterNotesByPriority(priority) {
    const filteredNotesByPriority = this._notes.filter(note => note.priority === priority);

    return filteredNotesByPriority;
  }

  static getPriorityName(priorityId) {
    if (this.PRIORITIES[priorityId].id === priorityId) {
      return this.PRIORITIES[priorityId].name;
    }
  }
}

Notepad.PRIORITIES = {
  0: {
    id: 0,
    value: 0,
    name: 'Low',
  },
  1: {
    id: 1,
    value: 1,
    name: 'Normal',
  },
  2: {
    id: 2,
    value: 2,
    name: 'High',
  },
};

// Экземпляр с начальными заметками
const notepad = new Notepad(initialNotes);

function createNoteContent(title, body) {
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

function createNoteFooter(priority) {
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

function createActionButton(ICON_TYPES, NOTE_ACTIONS) {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  actionButton.setAttribute('data-action', NOTE_ACTIONS);

  const actionIcon = document.createElement('i');
  actionIcon.classList.add('material-icons', 'action__icon');
  actionIcon.textContent = ICON_TYPES;

  actionButton.appendChild(actionIcon);

  return actionButton;
}

// Refs
const refs = {
  listRef: document.querySelector('.note-list'),
  editor: document.querySelector('.note-editor'),
  search: document.querySelector('.search-form'),
};

// UI
function createListItem({
  id,
  title,
  body,
  priority
}) {
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

function renderNoteList(listRef, notes) {
  const renderNotes = notes.map(note => createListItem(note));

  listRef.innerHTML = '';
  listRef.append(...renderNotes);

  return listRef;
}

renderNoteList(refs.listRef, notepad.notes);

const addListItem = (listRef, head, text) => {
  const newListItem = createListItem(head, text);

  listRef.appendChild(newListItem);
};

// Hendlers
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

const removeListItem = elem => {
  const parentListItem = elem.parentNode.closest('.note-list__item');
  const id = parentListItem.dataset.id;
  notepad.deleteNote(id);
  parentListItem.remove();
}

const handleListClick = ({
  target
}) => {
  if (target.nodeName !== 'I') return;

  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      removeListItem(target);
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
