import MicroModal from "micromodal";
import {
  Notyf
} from "notyf";
import {
  NOTE_ACTIONS,
  NOTIFICATION_MESSAGES
} from "./utils/constants";
import Notepad from "./notepad-model";
import {
  getRefs
} from "./refs";
import {
  renderNoteList,
  addListItem
} from "./view";
import "notyf/notyf.min.css";

const refs = getRefs();
const notyf = new Notyf();

let storagedNotes = localStorage.getItem("notes");

const noteList = storagedNotes ? JSON.parse(storagedNotes) : [];

renderNoteList(noteList);

const notepad = new Notepad(noteList);

const handleEditorSubmit = event => {
  event.preventDefault();

  const [input, textarea] = event.currentTarget.elements;
  const inputValue = input.value;
  const bodyValue = textarea.value;

  if (inputValue.trim() === "" || bodyValue.trim() === "") {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  const savedNote = notepad.saveNote(inputValue, bodyValue);
  savedNote.then(note => addListItem(refs.listRef, note));
  MicroModal.close("note-editor-modal");
  event.currentTarget.reset();
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
  storage.save("notes", notepad.notes);
};

const handleFilterChange = event => {
  const filteredNotes = notepad.filterNotesByQuery(event.target.value);
  filteredNotes.then(note => renderNoteList(note));
};

const handleListClick = ({
  target
}) => {
  if (target.nodeName !== "I") return;

  const action = target.parentNode.dataset.action;

  switch (action) {
    case NOTE_ACTIONS.DELETE:
      const parentListItem = target.parentNode.closest(".note-list__item");
      const id = parentListItem.dataset.id;
      notepad.deleteNote(id);
      parentListItem.remove();
      notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      break;

    case NOTE_ACTIONS.EDIT:
      console.log("edit");
      break;

    case NOTE_ACTIONS.INCREASE_PRIORITY:
      console.log("increase priority");
      break;

    case NOTE_ACTIONS.DECREASE_PRIORITY:
      console.log("decrease priority");
      break;
    default:
      console.log("noAction");
  }
};

const handleShowModal = () => {
  MicroModal.show("note-editor-modal");
};

refs.editor.addEventListener("submit", handleEditorSubmit);
refs.search.addEventListener("input", handleFilterChange);
refs.listRef.addEventListener("click", handleListClick);
refs.openEditor.addEventListener("click", handleShowModal);