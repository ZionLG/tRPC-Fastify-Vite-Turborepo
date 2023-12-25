import { useState } from "react";
import { trpc } from "../utils/trpc";

const RandomNumber = () => {
  const [num, setNumber] = useState<number>();
  trpc.test.randomNumber.useSubscription(undefined, {
    onData(data) {
      setNumber(data.randomNumber);
    },
  });
  return (
    <div>
      Here&apos;s a random number from a subscription: {num} <br />
    </div>
  );
};

export default RandomNumber;
