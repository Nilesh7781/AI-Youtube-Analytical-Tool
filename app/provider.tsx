"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async() => {
    try {
      // Prepare user data from Clerk
      const userData = {
        id: user?.id,
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
      };

      // Send to your backend API route
      const result = await axios.post("/api/user", userData);
      console.log("User synced:", result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return <>{children}</>;
}

export default Provider;
