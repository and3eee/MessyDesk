"use client";

import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useField, useForm } from "@mantine/form";

import { CreateNote } from "./NotePadController";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

import { useViewportSize } from "@mantine/hooks";
import { Prisma } from "@prisma/client";
import Decimal from "decimal.js";
import { UserPref } from "../lib/types";

export default function CreateNoteForm(props: {
  userRef: UserPref;
  posX: number;
  posY: number;
  onCreate: () => void
}) {
  const BadWordsNext = require("bad-words-next");
  const en = require("bad-words-next/data/en.json");

  const badwords = new BadWordsNext({ data: en });
  const field = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) =>
      (badwords.check(value.trim()) || value.trim().length <3 )? "Message invalid" : null,
  });
  const { height, width } = useViewportSize();
  const wrappedX =  new Prisma.Decimal(props.posX)
  const wrappedY =new Prisma.Decimal( props.posY)
  const router = useRouter();
  const submit = async () => {
    console.log(wrappedY)

    if (!field.error) {
    await CreateNote({
        id: 0,
        message: field.getValue(),
        posX: wrappedX,
        posY:  wrappedY,
        author: props.userRef.name ?? "Anon",
        color: props.userRef.color ?? "#FFFFFF",
        dateCreated: new Date(),
      });

      props.onCreate()
        router.refresh();
      
    }
  };

  return (
    <Stack>
      <Textarea
        rows={5}
        {...field.getInputProps()}
        label="Message"
        placeholder="Enter your message"
        mb="md"
      />
      <Button
        onClick={submit}
      >
        Post It
      </Button>
    </Stack>
  );
}
