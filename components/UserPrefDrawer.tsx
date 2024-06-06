"use client";
import {
  Button,
  Text,
  Drawer,
  Paper,
  Stack,
  TextInput,


  useMantineTheme,
  isLightColor,
  getThemeColor,
  ColorPicker,
  ActionIcon,

  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useField } from "@mantine/form";
import { savePrefs } from "./NotePadController";
import { FaceIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons";
import { UserPref } from "../lib/types";

export default function UserPrefDrawer(props: {
  userPrefsFromCookies: UserPref;
}) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const regexp = /[a-z]/gu;

  const name = useField({
    initialValue: props.userPrefsFromCookies.name ?? "Anon",
    validate: (noteColor) =>
      noteColor.trim().length < 2 ? "Value is too short" : null,
  });

  const color = useField({
    initialValue: props.userPrefsFromCookies.color ?? "#FFFFFF",
    validate: (noteColor) =>
      noteColor.trim().length < 2 ? "Value is too short" : null,
  });

  return (
    <>
      <Drawer
        opened={opened}
        position={"right"}
        onClose={close}
        title="User Preferences"
      >
        <Stack gap="lg" justify="stretch" align="center">
          <ActionIcon
            onClick={() => {
              setColorScheme(colorScheme == "light" ? "dark" : "light");
            }}
          >
            {colorScheme == "light" && <SunIcon />}
            {colorScheme == "dark" && <MoonIcon />}
          </ActionIcon>
          <TextInput label="Name" {...name.getInputProps()} />
          <ColorPicker
            format="rgb"
            swatches={[
              "#2e2e2e",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
            {...color.getInputProps()}
          />
          <Paper
            shadow="md"
            withBorder
            bg={color.getValue()}
            radius="xl"
            w="10rem"
            h="10rem"
          >
            <Stack align="center" justify="space-between">
              <Text
                c={
                  isLightColor(getThemeColor(color.getValue(), theme))
                    ? "black"
                    : "white"
                }
              >
                {" "}
                Example Note
              </Text>{" "}
              {name && name.getValue().length > 0 && (
                <Text
                  c={
                    isLightColor(getThemeColor(color.getValue(), theme))
                      ? "black"
                      : "white"
                  }
                >
                  {" "}
                  - {name.getValue()}
                </Text>
              )}
            </Stack>
          </Paper>
          <Button onClick={() => savePrefs(name.getValue(), color.getValue())}>
            Save Preferences
          </Button>
        </Stack>
      </Drawer>

      <ActionIcon onClick={open} size="lg">
        <PersonIcon />
      </ActionIcon>
    </>
  );
}
