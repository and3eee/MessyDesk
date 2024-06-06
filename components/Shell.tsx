"use server";
import { Container, Stack } from "@mantine/core";
import UserPrefDrawer from "./UserPrefDrawer";
import NavBar from "./NavBar";
import { Notifications } from "@mantine/notifications";

export default async function Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack>
      <NavBar />
      <Notifications />
      {children}
    </Stack>
  );
}
