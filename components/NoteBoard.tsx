"use client";

import {
  Affix,
  Box,
  Center,
  Container,
  Dialog,
  Paper,
  Text,
} from "@mantine/core";
import { useMouse, useToggle, useViewportSize } from "@mantine/hooks";
import { Note } from "@prisma/client";
import NotePad from "./NotePad";
import { modals } from "@mantine/modals";
import CreateNoteForm from "./CreateNoteForm";

import { NoteWrapped, UserPref } from "../lib/types";
import { useState } from "react";

export default function NoteBoard(props: {
  notes: NoteWrapped[];
  userPrefs: UserPref;
}) {
  const { ref, x, y } = useMouse();
  const { height, width } = useViewportSize();

 
  const [storedPos, setStoredPos] = useState<{ left: number; top: number }>();
  const [value, toggle] = useToggle();
  const handleAdd = async () => {
    if (
      storedPos &&
      Math.abs(storedPos.left - x) < 50 &&
      Math.abs(storedPos.top - y) < 50
    )
      return;
    else {
      if (!value) {
        setTimeout(() => toggle(), 200);
        await setStoredPos({
          left: x,
          top: y,
        });
      } else {
        if (value) {
          setTimeout(
            () =>
              setStoredPos({
                left: x,
                top: y,
              }),
            200
          );
          await toggle();
        }
      }
    }
  };

  return (
    <Center>
      <Paper
        shadow="xl"
        withBorder
        p={16}
        radius={"xl"}
        ref={ref}
        bg={"gray"}
        onClick={() => handleAdd()}
        h={height * 0.8}
        w={width * 0.9}
      >
       
        {props.notes.map((note: NoteWrapped) => (
          <NotePad key={note.id} note={note} />
        ))}
        <Dialog
          withCloseButton
          radius={"lg"}
          position={storedPos}
          opened={value}
        >
          <CreateNoteForm
          onCreate={() => toggle()}
            userRef={props.userPrefs}
            posX={x / (width * 0.9)}
            posY={y / (height * 0.8)}
          />
        </Dialog>
      </Paper>
    </Center>
  );
}
