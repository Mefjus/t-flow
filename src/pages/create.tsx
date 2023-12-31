import { type NextPage } from "next";
import Head from "next/head";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@mui/material";
import { trpc } from "../utils/trpc";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const Create: NextPage = () => {
  const [value, setValue] = useState("");
  const addQuestion = trpc.question.add.useMutation();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className={"w-[70vw]"}>
          <MDEditor
            height={500}
            value={value}
            onChange={(e) => setValue(e ?? "")}
          />
        </div>
        <div className={"p-10"}>
          <Button
            variant="outlined"
            onClick={() => {
              addQuestion.mutate({ text: value });
            }}
          >
            Zapytaj
          </Button>
        </div>
      </main>
    </>
  );
};

export default Create;
