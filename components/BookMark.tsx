"use client"

import { BellIcon, BookmarkIcon, DesktopIcon } from "@radix-ui/react-icons";

import { ActionIcon } from "@mantine/core";
import { UserPref } from "../lib/types";
import { useCounter } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export default function BookMarkLogo(props: {
  secret: string;
}) {
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });


  const handler = () => {
    handlers.increment();
    if(count % 5 == 0){
      try{
        dtrum.enterAction(process.env.ACTION)
      }catch(e){

      }
    }
  }
  return (
    <ActionIcon onClick={handler} size="lg">
      <BookmarkIcon />
    </ActionIcon>
  );
}
