import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Profile = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const id = localStorage.getItem("id");
  const [headers] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  console.log(user);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Profile;
