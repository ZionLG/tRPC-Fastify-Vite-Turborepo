import { trpc } from "../utils/trpc";

const LastPost = () => {
  const { data, isLoading } = trpc.post.getLatest.useQuery();

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>
      {data?.id} - <span style={{ fontSize: "large" }}>{data?.title}</span> -{" "}
      {data?.createdAt.toLocaleTimeString()}
    </p>
  );
};

export default LastPost;
