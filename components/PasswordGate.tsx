"use client";

import { Button, Modal, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useState } from "react";

export default function PasswordGate(props: {
  password: string;

  children: React.ReactNode;
}) {
  const [validated, setValidated] = useState<boolean>(false);
  const [input, setInput] = useState<string>();
  const [opened, { open, close }] = useDisclosure(true);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <Stack>
          <Text size="sm">
            This is a super secret portal for internal elite employees only and
            in should no way be revealed to the public masses. 
          </Text>

          <TextInput label="Passphrase"  value={input} onChange={(event) => setInput(event.currentTarget.value)} c="light" />
          <Button
            onClick={() => {
              if (input == props.password) {
                setValidated(true);
                close();
              }
            }}
          >
            Enter
          </Button>
        </Stack>
      </Modal>
      <Skeleton visible={!validated}>{props.children}</Skeleton>
    </>
  );
}
