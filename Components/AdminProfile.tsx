"use client";

import Image from "next/image";
import React from "react";
import { useAuth } from "@/lib/auth";

const AdminProfile = () => {
  const { user } = useAuth();
  const displayName = user?.display_name ?? "Loading…";
  const email = user?.email ?? "";
  const role = user?.role ?? "";

  return (
    <div className="flex flex-col items-start text-center gap-4 py-2">
      <div className="relative">
        <Image
          src="/avatar.jpg"
          alt="Profile Photo"
          width={80}
          height={80}
          className="rounded-xl object-cover"
        />
      </div>

      <div className="text-left">
        <h2 className="text-xl font-semibold text-white">{displayName}</h2>
        {email && <p className="text-gray-400 text-xs">{email}</p>}
        {role && (
          <span className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-secondary font-bold">
            {role}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
