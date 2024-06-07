"use server";
import { ActionIcon, Group } from "@mantine/core";
import UserPrefDrawer from "./UserPrefDrawer";
import { cookies } from "next/headers";
import { Suspense } from "react";
import PrimaryDrawer from "./PrimaryDrawer";
import LogoPlaceholder from "./LogoPlaceholder";
import BookMarkLogo from "./BookMark";

export default async function NavBar() {
  const cookieStore = cookies();
  const author = cookieStore.get("name")?.value;
  const colorCookie = cookieStore.get("color")?.value;
  const code = cookieStore.get("code")?.value;


  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Group maw="100%" m="lg" justify="space-between">
       <BookMarkLogo secret={process.env.ACTION ?? "This is weird"}/>
        <LogoPlaceholder secret={process.env.SECRET ?? "8675-309"}  userPrefsFromCookies={{
            name: author,
            color: colorCookie,
            code: code,
          }}/>
        <UserPrefDrawer
          userPrefsFromCookies={{
            name: author,
            color: colorCookie,
            code: code,
          }}
        />
      </Group>
    </Suspense>
  );
}
