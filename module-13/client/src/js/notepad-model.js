import {
  PRIORITIES,
  PRIORITY_TYPES
} from './utils/constants'
import * as api from './services/api';

class Notepad {
  constructor(notes = []) {
    this._notes = notes
  }

  // Возвращает все заметки
  getNotes() {
    return api.get().then(notes => {
      this.notes = notes;

      return this.notes;
    });
  };

  static getPriorityName(priorityId) {
    if (PRIORITIES[priorityId].id === priorityId) {
      return PRIORITIES[priorityId].name
    }
  }

  // Ищет заметку в массиве notes
  findNoteById(id) {
    let note = this._notes.find(note => note.id === id)
    return note
  }

  // Сохраняет заметку в массив notes
  saveNote(head, text) {
    const note = {
      title: head,
      body: text,
      priority: PRIORITY_TYPES.LOW
    }
    return api.save(note).then(savedNote => {
      this.notes.push(savedNote);

      return savedNote;
    });
  }

  // Удаляет заметку по идентификатору из массива notes
  deleteNote(id) {
    return api.del(id).then(() => {

      this.notes = this.notes.filter(note => note.id !== id);

      return this.notes;
    });
  }

  // Обновляет контент заметки
  updateNoteContent(id, item) {
    return api.update(id, item).then(updatedItem => {
      this.items = this.items.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );
      return updatedItem;
    });
  }

  // Обновляет приоритет заметки
  updateNotePriority(id, priority) {
    return new Promise(resolve => {
      setTimeout(() => {
        const note = this.findNoteById(id)
        if (!note) return
        note.priority = priority

        resolve(note)
      }, 500)
    })
  }

  // Фильтрует массив заметок по подстроке query
  filterNotesByQuery(query = '') {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredNotesByQuery = this._notes.filter(
          note => note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.body.toLowerCase().includes(query.toLowerCase())
        )

        resolve(filteredNotesByQuery)
      }, 500)
    })
  }

  // Фильтрует массив заметок по значению приоритета
  filterNotesByPriority(priority) {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredNotesByPriority = this._notes.filter(
          note => note.priority === priority
        )

        resolve(filteredNotesByPriority)
      }, 500)
    })
  }
}

export default Notepad