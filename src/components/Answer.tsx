import { Avatar, Chip, Skeleton } from "@mui/material";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Recycling, ThumbDown, ThumbUp } from "@mui/icons-material";
import { trpc } from "../utils/trpc";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
  loading: () => (
    <div className={"p-5"}>
      <Skeleton />
      <Skeleton />
    </div>
  ),
});
const Answer = ({
  id,
  text,
  firstName,
  lastName,
  img,
  likes,
  dislikes,
  ecolikes,
  onUpdate,
}: {
  id: string;
  text: string;
  img: string;
  firstName: string;
  lastName: string;
  likes: number;
  dislikes: number;
  ecolikes: number;
  onUpdate: () => void;
}) => {
  const like = trpc.answer.addLike.useMutation();
  const dislike = trpc.answer.addDislike.useMutation();
  const ecolike = trpc.answer.addEcolike.useMutation();

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
        <div
          className={"absolute bottom-0 left-3 z-10 flex translate-y-1/2 gap-2"}
        >
          <Chip
            className={"!bg-white"}
            icon={<ThumbUp />}
            label={String(likes)}
            onClick={() => {
              like.mutateAsync({ answerId: id }).then(() => {
                onUpdate();
              });
            }}
          />
          <Chip
            className={"!bg-white"}
            icon={<ThumbDown />}
            label={String(dislikes)}
            onClick={() => {
              dislike.mutateAsync({ answerId: id }).then(() => {
                onUpdate();
              });
            }}
          />
          <Chip
            className={"!bg-white"}
            icon={<Recycling />}
            label={String(ecolikes)}
            onClick={() => {
              ecolike.mutateAsync({ answerId: id }).then(() => {
                onUpdate();
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Answer;
