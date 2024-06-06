"use client";

import { Button, Modal, Overlay, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { BellIcon } from "@radix-ui/react-icons";
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
              }else{
                notifications.show({
                    color: "red",
                    icon: <BellIcon/>,
                    title: 'Error!',
                    message: "You should know the password though.",
                  })
              }
            }}
          >
            Enter
          </Button>
        </Stack>
      </Modal>
      {!validated && <Overlay color="#000" backgroundOpacity={0.35} blur={15} />}{props.children}
    </>
  );
}
