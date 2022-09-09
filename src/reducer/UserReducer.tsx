export let InitialState: any = null;

export const reducer = (state: any, action: any) => {
  if (action.type === "USER") return action.payload;
  if (action.type === "FOLLOWERS") return action.payload;
  return null;
};
