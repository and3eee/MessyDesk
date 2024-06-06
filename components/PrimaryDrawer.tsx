import { BookmarkIcon } from "@radix-ui/react-icons";

import { ActionIcon } from "@mantine/core";
import { UserPref } from "../lib/types";

export default function PrimaryDrawer(props: {
  userPrefsFromCookies: UserPref;
}) {
  return (
    <ActionIcon size="lg">
      <BookmarkIcon />
    </ActionIcon>
  );
}
