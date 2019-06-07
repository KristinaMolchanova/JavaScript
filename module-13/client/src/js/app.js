import MicroModal from 'micromodal'
import {
    Notyf
} from 'notyf'
import {
    NOTE_ACTIONS,
    NOTIFICATION_MESSAGES
} from './utils/constants'
import Notepad from './notepad-model'
import {
    getRefs
} from './refs'
import {
    createListItemsMarkup,
    addListItem
} from './view'
import 'notyf/notyf.min.css'

const notepad = new Notepad()
const refs = getRefs()
const notyf = new Notyf()

notepad.getNotes().then(notes => createListItemsMarkup(notes)).catch(error => {
    notyf.error(NOTIFICATION_MESSAGES.ERROR)
})

const handleShowModal = () => {
    MicroModal.show('note-editor-modal');
}

const handleShowEditModal = () => {
    MicroModal.show('note-editor-modal');
}

const handleEditorSubmit = event => {
    event.preventDefault()

    const [input, textarea] = event.currentTarget.elements
    const inputValue = input.value
    const bodyValue = textarea.value

    if (inputValue.trim() === '' || bodyValue.trim() === '') {
        notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY)
        return
    }

    const savedNote = notepad.saveNote(inputValue, bodyValue)
    savedNote.then(note => addListItem(refs.listRef, note))
    MicroModal.close('note-editor-modal')
    event.currentTarget.reset()
    notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS)
}

const handleFilterChange = event => {
    const filteredNotes = notepad.filterNotesByQuery(event.target.value)
    filteredNotes.then(note => createListItemsMarkup(note))
}

const listItem = findListItem(event.target);
const listItemId = listItem.dataset.id;
const note = notepad.findNoteById(listItemId);

const handleListClick = ({
    target
}) => {
    if (target.nodeName !== 'I') return

    const action = target.parentNode.dataset.action

    switch (action) {
        case NOTE_ACTIONS.DELETE:
            const parentListItem = target.parentNode.closest('.note-list__item')
            const id = parentListItem.dataset.id
            notepad
                .deleteNote(id)
                .then(() => {
                    parentListItem.remove()
                    notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS)
                })
                .catch(() => {
                    notyf.error(NOTIFICATION_MESSAGES.ERROR)
                })

            break

        case NOTE_ACTIONS.EDIT:
            handleShowEditModal();

            // const item = target.parentNode.closest('.note-list__item')
            // const id = parentListItem.dataset.id
            // notepad
            //     .updateNoteContent(id, item)
            //     .then(() => {
            //         item.saveNote(note)
            //         notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS)
            //     })
            //     .catch(() => {
            //         notyf.error(NOTIFICATION_MESSAGES.ERROR)
            //     })
            break

        case NOTE_ACTIONS.INCREASE_PRIORITY:
            console.log('increase priority')
            break

        case NOTE_ACTIONS.DECREASE_PRIORITY:
            console.log('decrease priority')
            break
        default:
            console.log('noAction')
    }
}

refs.editor.addEventListener('submit', handleEditorSubmit)
refs.search.addEventListener('input', handleFilterChange)
refs.listRef.addEventListener('click', handleListClick)
refs.openEditor.addEventListener('click', handleShowModal)