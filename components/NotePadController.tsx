"use server";

import { Note } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";

export async function CreateNote(input: Note) {

  const note = await prisma.note.create({
    data: {
      posX: input.posX,
      posY: input.posY,
      color: input.color,
      message: input.message,
      author: input.author,
      dateCreated: new Date(),
    },
  });
  const x = note.posX.toNumber();
  const y = note.posY.toNumber();
  return {  id: note.id,
    posX: x,
    posY: y,
    author: note.author,
    color: note.color,
    message: note.message,
    dateCreated: note.dateCreated,}
}

export async function savePrefs(name: string, color: string) {

  const cookieStore = cookies();
  cookieStore.set("name", name);
  cookieStore.set("color", color);
}
