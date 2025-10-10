"use client";
import axios from "axios";
import { ArrowUp, ImagePlus, User, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

function AIThumbnailGenerator() {
  const [userInput, setUserInput] = useState<string>();
  const [referanceImage, setReferanceImage] = useState<File>();
  const [faceImage, setFaceImage] = useState<File>();
  const [referanceImagePreview, setReferanceImagePreview] = useState<string>();
  const [faceImagePreview, setFaceImagePreview] = useState<string>();
  const[loading,setLoading]=useState(false);

  const onHandFileChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);

    if (field === "referanceImage") {
      setReferanceImage(selectedFile);
      setReferanceImagePreview(objectUrl);
    } else {
      setFaceImage(selectedFile);
      setFaceImagePreview(objectUrl);
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (referanceImagePreview) URL.revokeObjectURL(referanceImagePreview);
      if (faceImagePreview) URL.revokeObjectURL(faceImagePreview);
    };
  }, [referanceImagePreview, faceImagePreview]);

 const onSubmit = async () => {
  try {
    setLoading(true);
    const formData = new FormData();
    userInput && formData.append("userInput", userInput);
    referanceImage && formData.append("refImage", referanceImage);
    faceImage && formData.append("faceImage", faceImage);

    const result = await axios.post("/api/generate-thumbnail", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(result.data);
  } catch (err) {
    console.error("API error:", err);
  }
};



  return (
    <div>
      <div className="px-10 md:px-20 lg:px-40">
        <div className="flex items-center justify-center mt-20 flex-col gap-2">
          <h2 className="font-bold text-4xl">AI Thumbnail Generator</h2>
          <p className="text-gray-400 text-center">
            Turn any video into a click magnet with thumbnails that grab attention
            and drive views. Our AI Youtube thumbnail maker creates professional
            designs instantly — no design skill needed.
          </p>
        </div>

        <div className="flex gap-5 items-center p-5 border rounded-xl mt-10 bg-secondary">
          <textarea
            placeholder="Enter your YouTube video title or description"
            className="w-full outline-0 bg-transparent"
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className="p-3 bg-gradient-to-t from-red-500 to-orange-500 rounded-full cursor-pointer"

          onClick={onSubmit}
          >
            <ArrowUp />
          </div>
        </div>

        <div className="mt-3 flex gap-3">
          {/* Reference Image */}
          <label htmlFor="referanceImageUpload" className="w-full">
            {!referanceImagePreview ? (
              <div className="p-4 w-full border rounded-xl bg-secondary flex gap-2 items-center justify-center hover:scale-105 transition-all cursor-pointer">
                <ImagePlus />
                <h2>Reference Image</h2>
              </div>
            ) : 
            <div className="relative">
                <X className='absolute ' onClick={()=> setReferanceImagePreview(undefined)}/>
              <Image
                src={referanceImagePreview}
                alt="Referance Image"
                width={100}
                height={100}
                className="w-[70px] h-[70px] object-cover rounded-sm"
              /></div>
            }
          </label>
          <input
            type="file"
            id="referanceImageUpload"
            className="hidden"
            onChange={(e) => onHandFileChange("referanceImage", e)}
          />

          {/* Include Face */}
          <label htmlFor="IncludeFace" className="w-full">
            {!faceImagePreview?<div className="p-4 w-full border rounded-xl bg-secondary flex gap-2 items-center justify-center hover:scale-105 transition-all cursor-pointer">
              <User />
              <h2>Include Face</h2>
            </div>:
            <div className="relative">
                <X className='absolute ' onClick={()=> setFaceImagePreview(undefined)}/>
              <Image
                src={faceImagePreview}
                alt="Face Image"
                width={100}
                height={100}
                className="w-[70px] h-[70px] object-cover rounded-sm"
              /></div>
            }
          </label>
          <input
            type="file"
            id="IncludeFace"
            className="hidden"
            onChange={(e) => onHandFileChange("FaceImage", e)}
          />
        </div>
      </div>
    </div>
  );
}

export default AIThumbnailGenerator;
