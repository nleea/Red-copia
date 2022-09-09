import React from "react";

export const Input: React.FC<{
  type: string;
  options: any;
  change?: any;
  value?: string;
}> = (props) => {
  let input: any[] = [];
  switch (props.type) {
    case "text":
      input.push(
        <input
          type="text"
          {...props.options}
          key={props.options.name}
          onChange={props.change}
          value={props.value}
        />
      );
      break;

    case "email":
      input.push(
        <input
          type="email"
          {...props.options}
          key={props.options.name}
          onChange={props.change}
          value={props.value}
        />
      );
      break;

    case "password":
      input.push(
        <input
          type="email"
          {...props.options}
          key={props.options.name}
          onChange={props.change}
          value={props.value}
        />
      );
      break;

    case "file":
      input.push(
        <input
          type="file"
          {...props.options}
          key={props.options.name}
          onChange={props.change}
        />
      );
      break;
    default:
      break;
  }

  return <>{input}</>;
};
