"use client";

import { BellIcon, BookmarkIcon, DesktopIcon } from "@radix-ui/react-icons";

import { ActionIcon } from "@mantine/core";
import { UserPref } from "../lib/types";
import { useCounter } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export default function LogoPlaceholder(props: {
  userPrefsFromCookies: UserPref;
  secret: string;
}) {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });

  const handler = () => {
    handlers.increment();
    try {
      if (typeof dtrum !== "undefined")
        dtrum.enterAction("Pressed Logo x" + count);
    } catch (e) {}
    if (count == 42 || count == 100) {
      try {
        if (typeof dtrum !== "undefined") {
          dtrum.enterAction("Pressed ");
          dtrum.identifyUser("Breaking Things");
        }
      } catch (e) {}
      notifications.show({
        color: "red",
        icon: <BellIcon />,
        title: "Error!",
        message:
          "User found super sensititive data I mean here is a SSN: " +
          props.secret,
      });
    }
  };
  return (
    <ActionIcon
      onClick={handler}
      radius={"xl"}
      color={props.userPrefsFromCookies.color ?? "green"}
      size="xl"
    >
      <DesktopIcon />
    </ActionIcon>
  );
}
