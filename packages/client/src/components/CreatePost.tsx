import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const { mutate, isPending } = trpc.post.create.useMutation();
  return (
    <form>
      <input
        type="text"
        name="Title"
        placeholder="Enter title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        disabled={isPending}
        onClick={() => {
          mutate({ title: title });
        }}
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
