"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { logoutUser } = useAuth();

  return (
    <>
      <div>Profile Page</div>
      <div
        onClick={() => {
          logoutUser();
          router.push("/signin");
        }}
      >
        Logout
      </div>
    </>
  );
}
