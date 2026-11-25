import { Pencil, Trash } from "lucide-react";
import { IconButton } from "./iconbutton";

export function RowActions({onEdit, onDelete, children}){
    return(
        <div className="flex items-center justify-end gap-1">
            {children}
            <IconButton labele="Edit" onclick={onEdit}>
                <Pencil size={16}/>
            </IconButton>
            <IconButton label="Delete" onclick={onDelete} className="hover:text-red-600"><Trash size={16} /></IconButton>
        </div>
    )
}