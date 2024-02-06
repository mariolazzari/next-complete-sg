"use client";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const session = useSession();

  if (session.data?.user) {
    return <div>From client: user in signed in </div>;
  }

  return <div>From client: user is signed out</div>;
};

export default ProfilePage;
