import { Badge } from "@/components/ui/Badge";
import { RowActions } from "@/components/ui/RowActions";
import { Table, Td } from "@/components/ui/Table";
import { RsvpBadge } from "./RsvpBadge";

export function GuestTable({ guests, onEdit, onDelete, onCycleRsvp }) {
  return (
    <Table headers={["Guest", "Group", "Party", "Aso-ebi", "Reply", ""]}>
      {guests.map((guest) => (
        <tr key={guest.id}>
          <Td>
            <p className="font-semibold">{guest.name}</p>
            {guest.phone && <p className="text-xs text-ink/60">{guest.phone}</p>}
          </Td>
          <Td>{guest.group}</Td>
          <Td>{guest.partySize}</Td>
          <Td>{guest.asoEbi ? <Badge tone="gold">Yes</Badge> : <span className="text-ink/40">No</span>}</Td>
          <Td>
            <RsvpBadge status={guest.rsvp} onClick={() => onCycleRsvp(guest)} />
          </Td>
          <Td>
            <RowActions onEdit={() => onEdit(guest)} onDelete={() => onDelete(guest)} />
          </Td>
        </tr>
      ))}
    </Table>
  );
}
