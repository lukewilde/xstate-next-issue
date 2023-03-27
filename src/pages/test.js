import { useMachine } from "@xstate/react";
import React, { useEffect } from "react";
import { createMachine } from "xstate";

const machine = createMachine({
  predictableActionArguments: true,
  id: "less-favourites",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        FETCH: "get",
      },
    },
    get: {
      entry: () => console.log("we enter"),
      exit: (ctx, event) => console.log("exited ❌❌❌", event),
      invoke: {
        src: () => {
          console.log("running machine");
          return new Promise((resolve) => {
            resolve("here's the result data");
          });
        },
        onDone: {
          actions: (ctx, event) => console.log("got em! ✅", event.data),
        },
        onError: {
          // if we have tried fetching these items 3 times already, give up and stop trying!
          actions: () => console.log("got error 2!"),
        },
      },
    },
  },
});

const Test = () => {
  const [favs, favsSend] = useMachine(machine);

  console.log("rendering")
  useEffect(() => {
    console.log("fetching 🐟🐟")
    favsSend("FETCH");
  }, []);

  return <p>page</p>;
};

export default Test;
