'use strict'

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2
}

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
    for (let note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
  }

  // Сохраняет заметку в массив notes
  saveNote(note) {
    return this.notes.push(note);
  }

  // Удаляет заметку по идентификатору из массива notes
  deleteNote(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];

      if (id === note.id) {
        this.notes.splice(i, 1);
      }
    }
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
  filterNotesByQuery(query) {
    const filteredNotesByQuery = [];

    for (let note of this.notes) {
      const title = note.title.toLowerCase();
      const body = note.body.toLowerCase();
      query.toLowerCase();

      if (title.includes(query) || body.includes(query)) {
        filteredNotesByQuery.push(note);
      }
    }
    return filteredNotesByQuery;
  }

  // Фильтрует массив заметок по значению приоритета
  filterNotesByPriority(priority) {
    const filteredNotesByPriority = [];

    for (let note of this.notes) {
      if (note.priority === priority) {
        filteredNotesByPriority.push(note);
      }
    }
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
];

/*
 * Посмотрим имя приоритета по id
 */
console.log(Notepad.getPriorityName(PRIORITY_TYPES.LOW)); // "Low"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.NORMAL)); // "Normal"
console.log(Notepad.getPriorityName(PRIORITY_TYPES.HIGH)); // "High"

const notepad = new Notepad(initialNotes);

/*
  Смотрю что у меня в заметках после инициализации
*/
console.log('Все текущие заметки: ', notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 3,
  title: 'Get comfy with Frontend Frameworks',
  body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notepad.saveNote({
  id: 4,
  title: 'Winter clothes',
  body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
console.log('Заметки после обновления приоритета для id 4: ', notepad.notes);

/*
 *  Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log('Заметки после обновления приоритета для id 3: ', notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(PRIORITY_TYPES.NORMAL),
);

/*
 * Обновим контент заметки с id 3
 */
notepad.updateNoteContent(3, {
  title: 'Get comfy with React.js or Vue.js'
});
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id 2
 */
notepad.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notepad.notes);