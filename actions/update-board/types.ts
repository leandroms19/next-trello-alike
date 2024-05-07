import { z } from "zod";
import { UpdatedBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { board } from "@prisma/client";

export type InputType = z.infer<typeof UpdatedBoard>;
export type ReturnType = ActionState<InputType, board>;