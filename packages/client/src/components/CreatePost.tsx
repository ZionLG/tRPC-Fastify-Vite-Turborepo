import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const { mutate, isLoading } = trpc.post.create.useMutation();
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
        disabled={isLoading}
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
