import { useEffect, useState } from "react";
import { axiosInstance } from "./lib/axios.config";
import { Comment } from "./lib/types/comment.type";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import CreateForm from "./components/partials/create-form";
import CommentCard from "./components/partials/comment-card";

function App() {
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  useEffect(() => {
    axiosInstance.get("/comment").then((res) => {
      setComments(res.data);
    });
  }, []); 

  return (
    <div className="p-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Create your first comment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateForm/>
          <Separator />
          {comments?.map((comment) => (
           <>
            <CommentCard comment={comment} key={comment.id}/>
            <Separator key={`separator-${comment.id}`}/>
           </>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
