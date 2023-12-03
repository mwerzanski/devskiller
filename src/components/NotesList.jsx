import React from 'react'

export const NotesList = (props) => {
    const { notes = [] , onSelect, selected} = props

    console.log('notes:' + notes.toString())

    function handleSelectNote(note) {
        onSelect(note)
    }

    return <div className="list-group">
        {notes.length > 0 && notes.map(note => (
        <div data-testid="note-item" className={note.id === selected?.id ? "list-group-item active" : "list-group-item"} 
            onClick={(e) => {
                handleSelectNote(note);
            }}>{note.title}</div>
        ))}
    </div>
}
