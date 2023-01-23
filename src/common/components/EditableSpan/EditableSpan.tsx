import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle:(editedTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> =React.memo( ({title, changeTitle})=>{
    const [text, setText] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeSetText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)

    }
    const onEditMode = () => {
        setEditMode(true)

    }
    const onKeyDownChangeTitle = (e: React.KeyboardEvent<HTMLElement>) => {
        e.key === "Enter" && offEditMode()
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }

    return editMode
        ? <TextField variant="outlined"
            value={text}
                  onChange={onChangeSetText}
                  onKeyDown={onKeyDownChangeTitle}
                  onBlur={offEditMode}
                  autoFocus/>
   : <span onDoubleClick={onEditMode} onKeyDown={() => {}}>{text}</span>
})