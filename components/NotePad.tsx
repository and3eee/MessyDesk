"use client";
import { Affix, Center, Paper, Stack, Text, getThemeColor, isLightColor, rem, useMantineTheme } from "@mantine/core";
import { useMove, useViewportSize } from "@mantine/hooks";
import { Note } from "@prisma/client";
import { useState } from "react";
import { NoteWrapped } from "../lib/types";
import { theme } from "../theme";

export default function NotePad(props: { note: NoteWrapped; admin?: boolean }) {
  const theme = useMantineTheme();
  const { height, width } = useViewportSize();
  return (
    <Paper
      style={{
        position: "absolute",
        left: props.note.posX * 0.85 * width + 0.05 * width,
        top: props.note.posY * 0.68 * height ,
      }}
      shadow="xl"
      bg={props.note.color}
      radius="xl"
      w="10rem"
      h="10rem"
    >
      <Stack m={16} align="center" justify="center">
        <Text  c={
                  isLightColor(getThemeColor(props.note.color, theme))
                    ? "black"
                    : "white"
                }> {props.note.message}</Text>
        {props.note.author && props.note.author.length > 0 && (
          <Text  c={
            isLightColor(getThemeColor(props.note.color, theme))
              ? "black"
              : "white"
          } truncate lineClamp={4}>
            {" "}
            - {props.note.author}
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
