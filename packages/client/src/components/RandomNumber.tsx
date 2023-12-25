import { trpc } from "../utils/trpc";

const RandomNumber = () => {
  trpc.randomNumber.useSubscription(undefined, {
    onData(number) {
      console.log(number);
    },
  });
  return <></>;
};

export default RandomNumber;
