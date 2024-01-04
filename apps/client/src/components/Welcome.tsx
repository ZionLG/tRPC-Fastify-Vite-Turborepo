import { trpc } from "../utils/trpc";

type WelcomeProps = {
  name: string;
};

const Welcome = ({ name }: WelcomeProps) => {
  const { data, isPending } = trpc.test.greeting.useQuery({ name });

  return isPending ? (
    <p>Loading...</p>
  ) : (
    <p>
      Hello <code>{data?.text}</code>
    </p>
  );
};

export default Welcome;
