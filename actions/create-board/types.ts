import { z } from "zod";
import { CreateBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { board } from "@prisma/client";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, board>;
