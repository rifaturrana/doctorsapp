import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
const StepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewUrl, setpreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return <div></div>;
};

export default StepOne;
