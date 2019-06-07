import {
    PRIORITIES,
    PRIORITY_TYPES
} from './utils/constants';

class Notepad {
    constructor(notes = []) {
        this._notes = notes;
    }

    // Возвращает все заметки
    get notes() {
        return this._notes;
    }

    static getPriorityName(priorityId) {
        if (PRIORITIES[priorityId].id === priorityId) {
            return PRIORITIES[priorityId].name;
        }
    }

    // Ищет заметку в массиве notes
    findNoteById(id) {
        let note = this._notes.find(note => note.id === id);
        return note;
    }

    //Генерирует рандомный id
    static generateUniqueId() {
        const shortid = require('shortid');
        return shortid.generate();
    }

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
}

export default Notepad;