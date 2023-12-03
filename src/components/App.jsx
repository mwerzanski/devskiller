import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)

    // (!) Get notes from service
    useEffect(() => {
        const getInitialNotes= async () => {
            const allNotes = await service.getNotes();
            setNotes(allNotes)
        }

        getInitialNotes()
    }, [service])

    // Select new empty note
    function newNote(){
        const newNote = { title: '', text: '' };
        console.log("note:" + newNote.toString())
        setSelected(newNote)
    }

    // Set note as selected
    function onSelect(note){
        setSelected(note);
    }

    // Save note to service
    async function onSubmit(note){
        await service.saveNote(note);
        const allNotes = await service.getNotes();
        setNotes(allNotes)
        setSelected(note)
    }

    // Unselect note
    function onCancel(){
        setSelected(null);
    }

    function onChange(note){
        setSelected(note)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList notes={notes} onSelect={onSelect} selected={selected}/>
                </div>
                <div className="col-md-8">
                    <NoteForm note={selected} onCancel={onCancel} onSubmit={onSubmit} onChange={onChange}/>
                    <div>{selected === null && (<button data-testid="new-note" onClick={() => newNote()}>New Note</button>)}</div>
                </div>
            </div>
        </div>
    )
}
