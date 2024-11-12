import { axiosInstance } from "@/lib/axios.config";
import { editCommentSchema } from "@/lib/zod.schemas";
import { z } from "zod";
import { Comment } from "@/lib/types/comment.type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
interface PropsFormEdit {
    form: UseFormReturn<z.infer<typeof editCommentSchema>>;
    comment: Comment;
    setIsEditing: Function;
}
export default function FormEdit({
  form,
  comment,
  setIsEditing,
}: PropsFormEdit) {
  const handleSubmitEdit = (values: z.infer<typeof editCommentSchema>) => {
    axiosInstance
      .put(`/comment/${comment.id}`, values)
      .then((res) => {
        console.log(res.data);
        form.setValue("body", res.data.body);
      })
      .catch((err) => console.log(err));

    setIsEditing(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitEdit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Editing</FormLabel>
              <FormControl>
                <Textarea placeholder="Comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
        <Button variant={"outline"} onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </form>
    </Form>
  );
}
