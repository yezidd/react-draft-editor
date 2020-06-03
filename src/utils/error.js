import TypedError from "error/typed";
// 定义为服务器端报错
export const ServerRequestError = TypedError({
  type: "ServerRequest",
  message: "[{statusCode}] {title}",
  title: "",
  statusCode: ""
});

export const ClientRequestError = TypedError({
  type: "ClientRequest",
  message: "{title}",
  title: ""
});

export const ServerWSError = TypedError({
  type: "ServerWS",
  message: "[{code}] {event}: {reason}",
  title: "",
  event: "",
  code: "",
  reason: ""
});

export const NotRealError = TypedError({
  type: "NotReal",
  message: "{title}",
  title: ""
});
