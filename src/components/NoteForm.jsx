import React from 'react'

export const NoteForm = (props) => {
    const { note = { title: '', text: '' }, onSubmit, onCancel, onChange } = props;

    function handleTextChange(e) {
        const updateNote = { ...note, text: e.target.value };
        onChange(updateNote)
    }

    function handleTitleChange(e) {
        const updateNote = { ...note, title: e.target.value };
        onChange(updateNote)
    }

    async function handleOnSubmit(e) {
        e.preventDefault();
        const newNote = { ...note };
        await onSubmit(newNote)
    }

    function handleCancelNote() {
        onCancel()
    }

    return <form>
        <div className="form-group">
            <label>Title:</label>
            <input
                className="form-control"
                data-testid="input-title"
                name="title"
                value={note ? note.title : ''}
                onChange={(e) => handleTitleChange(e)}
            />
        </div>
        <div className="form-group">
            <label>Note:</label>
            <textarea
                className="form-control"
                data-testid="input-text"
                name="text"
                value={note ? note.text : ''}
                onChange={(e) => handleTextChange(e)}
            />
        </div>
        <div className="form-group">
            <input
                type="button"
                data-testid="cancel-note"
                className="btn btn-default pull-right"
                value="Cancel"
                onClick={(e) => handleCancelNote()}
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-default pull-right"
                value="Save"
                onClick={(e) => handleOnSubmit(e)}
            />
        </div>
    </form>
}
