import { Avatar, Card, Skeleton } from "@mui/material";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
  loading: () => (
    <>
      <Skeleton />
      <Skeleton />
    </>
  ),
});
const Question = ({
  text,
  firstName,
  lastName,
  img,
}: {
  text: string;
  img: string;
  firstName: string;
  lastName: string;
}) => {
  return (
    <div className={"pt-8"}>
      <div className={"relative z-0 w-full rounded-xl bg-white p-5"}>
        <div className={"absolute left-3 top-0 z-10 -translate-y-1/2"}>
          <Avatar sx={{ width: 64, height: 64 }} src={img} />
        </div>
        <div className={" pt-5"}>
          <MDPreview className={"!bg-transparent  !text-black"} source={text} />
        </div>
        <p className={"mt-4 text-gray-700"}>
          ~ {firstName} {lastName}
        </p>
      </div>
    </div>
  );
};

export default Question;
