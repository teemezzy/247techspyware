import Image from 'next/image';
import React from 'react';

const AdminProfile = () => {
  const firstName = "Adegboyega";
  const lastName = "Olutoromo";
  const email = "admin@example.com";

  return (
    <div className="flex flex-col items-start text-center gap-6 py-6">
      {/* Avatar */}
      <div className="relative">
        <Image
          src="/avatar.jpg"
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-xl object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-semibold text-white">
        {firstName} {lastName}
      </h2>

      {/* Email */}
      <p className="text-gray-400 text-sm">
        {email}
      </p>
    </div>
  );
};

export default AdminProfile;
