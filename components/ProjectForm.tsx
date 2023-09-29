"use client";

import React, { useState } from "react";
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constant";
import CustomeMenu from "./CustomeMenu";
import Button from "./Button";
import { createNewProject, getUserToken } from "@/lib/action";
import { useRouter } from "next/navigation";

interface formProps {
  type: string;
  session: SessionInterface;
}
const ProjectForm = ({ type, session }: formProps) => {
  const router = useRouter();
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    liveSiteUrl: "",
    category: "",
    githubUrl: "",
  });
  const [isSummiting, setSummiting] = useState<boolean>(false);

  const handleStateChange = (filedName: string, value: string) => {
    setForm((previouseForm) => ({ ...previouseForm, [filedName]: value }));
  };

  const handleImageSummit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ event: e });
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.includes("image")) return alert("Please upload an image!");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handlerFormSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSummiting(true);
    //@ts-ignore
    const { token } = await getUserToken();
    console.log({ Toxxxx: token });

    try {
      if (token) {
        if (type === "create") {
          await createNewProject(form, session?.user?.id, token);
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSummiting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlerFormSummit} className="form_container">
        <div className=" flexCenter upload_container">
          <div>
            <label
              htmlFor="imagePoster"
              className="form_image_lable cursor-pointer"
            >
              {!form.image && "pls choose image for upload"}
            </label>
            <div>
              <input
                id="image"
                type="file"
                accept="image/*"
                required={type === "create" ? true : false}
                onChange={(e) => handleImageSummit(e)}
                className="input_image"
              />
            </div>
          </div>
          <div>
            {form.image && (
              <Image
                src={form?.image}
                alt={form.image || "uploaded Image"}
                // width={300}
                // height={300}
                fill
                className="sm:p-10 z-50 object-contain"
              />
            )}
          </div>
        </div>
        <div>
          <FormField
            title="Title"
            state={form.title}
            placeholder="Flexibble"
            setState={(value) => handleStateChange("title", value)}
          />

          <FormField
            title="Description"
            state={form.description}
            placeholder="Showcase and discover remarkable developer projects."
            setState={(value) => handleStateChange("description", value)}
          />

          <FormField
            type="url"
            title="Website URL"
            state={form.liveSiteUrl}
            placeholder="https://OlinyaCPaul.com"
            setState={(value) => handleStateChange("liveSiteUrl", value)}
          />

          <FormField
            type="url"
            title="GitHub URL"
            state={form.githubUrl}
            placeholder="https://github.com/OLINYA-PAUL"
            setState={(value) => handleStateChange("githubUrl", value)}
          />
        </div>
        <CustomeMenu
          title="Category"
          filters={categoryFilters}
          state={form.category}
          setState={(value) => handleStateChange("category", value)}
        />
        <div className="w-full flexStart mb-20 mt-10">
          <Button
            type="submit"
            title={
              isSummiting
                ? `${type === "create" ? "Creating..." : "Editing..."} `
                : `${type === "create" ? "Create" : "Edit"}`
            }
            leftIcon={isSummiting ? "" : "/plus.svg"}
            isSummiting={isSummiting}
            textColour=""
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
