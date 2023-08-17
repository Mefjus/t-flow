import { router } from "../trpc";
import { exampleRouter } from "./example";
import { questionRouter } from "./question";
import { answerRouter } from "./answer";

export const appRouter = router({
  example: exampleRouter,
  question: questionRouter,
  answer: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
