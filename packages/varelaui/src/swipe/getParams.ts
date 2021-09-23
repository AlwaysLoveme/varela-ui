type ParamsType = Record<string, string | boolean | Object | unknown>;
export function getParams(props: ParamsType) {
  const params: ParamsType = {};

  Object.keys(props).forEach((key) => {
    params[key] = props[key];
  });

  return params;
}
