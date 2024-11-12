import { axiosInstance } from "@/lib/axios.config";
import { Comment } from "@/lib/types/comment.type";
import { editCommentSchema } from "@/lib/zod.schemas";
import { Pencil, Reply, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormEdit from "./form-edit";
import { Button } from "../ui/button";
import CreateForm from "./create-form";

export default function CommentCard({ comment }: { comment: Comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const formEdit = useForm<z.infer<typeof editCommentSchema>>({
    defaultValues: {
      body: comment.body,
    },
  });
  // to edit a comment
  const onClickDelete = (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      axiosInstance
        .delete(`/comment/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      location.reload();
    }
  };
  return (
    <div key={comment.id} className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <button
            onClick={() => {
              onClickDelete(comment.id);
            }}
          >
            <Trash size={16} className="text-red-500" />
          </button>
          <p className="flex gap-1 flex-nowrap items-center">
            <span className="font-bold text-sm">{comment.email} |</span>
            {!comment.replyToId && (
              <Button
                variant="link"
                className="p-0"
                onClick={() => setIsReplying(true)}
              >
                <Reply size={16} className="text-blue-500" />
              </Button>
            )}
          </p>
        </div>
        {isEditing ? (
          <FormEdit
            form={formEdit}
            comment={comment}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="bg-gray-100 rounded-sm flex gap-2 flex-nowrap items-end p-3 justify-between">
            <p className="text-gray-500 text-pretty">
              {formEdit.getValues("body")}
            </p>
            <button onClick={() => setIsEditing(true)}>
              <Pencil size={16} className="text-blue-500" />
            </button>
          </div>
        )}
        {isReplying && (
          <div className="ml-12 bg-gray-100 rounded-md p-6">
            <i>Reply to:</i> <b>{comment.email}</b>
            <CreateForm commentToReply={comment} />
          </div>
        )}
        {comment.replies?.map((reply) => (
          <div className="ml-6 flex flex-nowrap">
            <div className="h-auto w-6 border-l-2 border-b-2 border-gray-200 rounded-bl-md mb-6"></div>
            <CommentCard comment={reply} key={reply.id}/>
          </div>
        ))}
      </div>
    </div>
  );
}
