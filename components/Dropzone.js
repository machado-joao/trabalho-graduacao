import axios from "axios";
import FileImg from "../public/images/file.svg";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

function Dropzone() {

  const [images, setImages] = useState([]);

  function handleUpload() {
    console.log("Enviando arquivos...");
    axios
      .post("https://localhost:4000/upload", { images })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    toast.success("Imagens enviadas com sucesso!");
    const reload = () => window.location.reload(false);
    setTimeout(reload, 2000);
  }

  const onDrop = useCallback((acceptedFiles, rejectFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    console.log("acceptedFiles", acceptedFiles);
    console.log("rejectFiles", rejectFiles);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".webp"],
    },
  });

  const fileRemove = (file) => {
    const updatedList = [...images];
    updatedList.splice(images.indexOf(file), 1);
    toast.error("Imagem removida.");
    setImages(updatedList);
  };

  return (
    <div className="card p-5 h-fit">
      <div
        {...getRootProps()}
        className="w-full shadow-md text-xl bg-sky-100 rounded-xl h-fit p-5 text-center border-dotted border-2 border-gray-600"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <span className="flex flex-col">
            <Image
              src={FileImg}
              alt="Ícone de um arquivo de imagem."
              width={100}
              heigth={100}
              unoptmized
            />
          </span>
        ) : (
          <span className="flex flex-col">
            <Image
              src={FileImg}
              alt="Ícone de um arquivo de imagem."
              width={100}
              heigth={100}
              unoptmized
            />
            <span className="ml-1">
              Clique aqui para selecionar as imagens ou arraste e solte suas
              imagens aqui!
            </span>
          </span>
        )}
      </div>
      {images.length > 0 && (
        <div className="mt-5 flex">
          {images.length > 0 && (
            <div className="flex items-center">
              <div className="flex gap-x-4">
                {images.map((image, index) => (
                  <div key={index} className="flex justify-between">
                    <Image
                      src={image}
                      alt="Imagem adicionada."
                      width={100}
                      height={100}
                      className="rounded-lg"
                      unoptimized
                    />
                    <span
                      className="flex relative z-10 cursor-pointer"
                      onClick={fileRemove}
                    >
                      <IoIosClose />
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-800 border text-white border-solid border-gray-300"
                onClick={handleUpload}
              >
                Enviar imagens
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropzone;
