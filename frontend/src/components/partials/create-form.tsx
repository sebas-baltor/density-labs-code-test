import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { useForm } from "react-hook-form";
  import {z} from 'zod';
    import {zodResolver} from '@hookform/resolvers/zod';
import { createCommentSchema } from "@/lib/zod.schemas";
import { axiosInstance } from "@/lib/axios.config";
import { Comment } from "@/lib/types/comment.type";

export default function CreateForm({commentToReply,setIsReplying}: {commentToReply?: Comment, setIsReplying?: Function}) {

    const formCreate = useForm<z.infer<typeof createCommentSchema>>({
        resolver:zodResolver(createCommentSchema),
        defaultValues: {
          body: "",
          email: "",
          replyToId: commentToReply?.id,
        },
      });
    
      const handleSubmitCreate = (values: z.infer<typeof createCommentSchema>) => {
        axiosInstance
          .post("/comment", values)
          .then((res) => {
            console.log(res.data);
            formCreate.reset();
            location.reload();
            if (setIsReplying) {
              setIsReplying(false);
            }
          })
          .catch((err) => console.log(err));
      };
    return(
        <Form {...formCreate}>
            <form
              onSubmit={formCreate.handleSubmit(handleSubmitCreate)}
              className="space-y-8"
            >
              {commentToReply && (
                <FormField
                  control={formCreate.control}
                  name="replyToId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="number" {...field} className="hidden"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={formCreate.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formCreate.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Comment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Publish</Button>
              {setIsReplying && (
                <Button
                  variant={"outline"}
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
              )}
            </form>
          </Form>
    )
}