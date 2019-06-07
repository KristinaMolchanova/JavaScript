import {
    PRIORITIES,
    PRIORITY_TYPES
} from "./utils/constants";
import storage from "./utils/storage";

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
        const shortid = require("shortid");
        return shortid.generate();
    }

    // Сохраняет заметку в массив notes
    saveNote(head, text) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newNote = {
                    id: Notepad.generateUniqueId(),
                    title: head,
                    body: text,
                    priority: PRIORITY_TYPES.LOW,
                };
                this._notes.push(newNote);
                storage.save('notes', this._notes);

                resolve(newNote);
            }, 500);
        });
    }

    // Удаляет заметку по идентификатору из массива notes
    deleteNote(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                this._notes = this._notes.filter(note => note.id != id);
                storage.save('notes', this._notes);

                resolve(this._notes);
            }, 500);
        });
    }

    // Обновляет контент заметки
    updateNoteContent(id, updatedContent) {
        return new Promise(resolve => {
            setTimeout(() => {
                const note = this.findNoteById(id);
                const keys = Object.keys(updatedContent);
                for (let key of keys) {
                    note[key] = updatedContent[key];
                }
                resolve(note);
            }, 500);
        });
    }

    // Обновляет приоритет заметки
    updateNotePriority(id, priority) {
        return new Promise(resolve => {
            setTimeout(() => {
                const note = this.findNoteById(id);
                if (!note) return;
                note.priority = priority;

                resolve(note);
            }, 500);
        });
    }

    // Фильтрует массив заметок по подстроке query
    filterNotesByQuery(query = "") {
        return new Promise(resolve => {
            setTimeout(() => {
                const filteredNotesByQuery = this._notes.filter(
                    note =>
                    note.title.toLowerCase().includes(query.toLowerCase()) ||
                    note.body.toLowerCase().includes(query.toLowerCase())
                );

                resolve(filteredNotesByQuery);
            }, 500);
        });
    }

    // Фильтрует массив заметок по значению приоритета
    filterNotesByPriority(priority) {
        return new Promise(resolve => {
            setTimeout(() => {
                const filteredNotesByPriority = this._notes.filter(
                    note => note.priority === priority
                );

                resolve(filteredNotesByPriority);
            }, 500);
        });
    }
}

export default Notepad;