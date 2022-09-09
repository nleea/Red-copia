import { createContext } from "react";
import { InitialState } from "../reducer/UserReducer";
let valuesctx: any = InitialState;
let dispatch: any = null;
export const context = createContext({ valuesctx, dispatch });
