
import NoteBoard from "../components/NoteBoard";
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import { Note } from "@prisma/client";
import PasswordGate from "../components/PasswordGate";


export const dynamic = "force-dynamic"

export default async function HomePage() {
  const cookieStore = cookies();
  const author = cookieStore.get("name")?.value;
  const colorCookie = cookieStore.get("color")?.value;
  const code = cookieStore.get("code")?.value;
  const prefs = {
    name: author,
    color: colorCookie,
    code: code,
  };

  const notes = await prisma.note.findMany({
    where: { posX: { lt: 1 }, posY: { lt: 1 } },
  });

  return (
    <div>
      <PasswordGate password={process.env.PASSWORD ?? "Super Secret"}>
        
        <NoteBoard
          userPrefs={prefs}
          notes={notes.map((note: Note) => {
            const x = note.posX.toNumber();
            const y = note.posY.toNumber();
            return {
              id: note.id,
              posX: x,
              posY: y,
              author: note.author,
              color: note.color,
              message: note.message,
              dateCreated: note.dateCreated,
            };
          })}
        />
      </PasswordGate>
    </div>
  );
}
