/* eslint-disable no-dupe-else-if */
import { getWindow } from "ssr-window";

// 删除对象某一属性
export function deleteProps(obj: Record<string, any>): unknown {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
      throw new Error(e as string);
      // no setter for object
    }
    try {
      delete object[key];
    } catch (e) {
      throw new Error(e as string);
      // something got wrong
    }
  });
  return object;
}

// 序列化url, eg: https://www.baidu.com?code=234&id=ashda
export function parseUrlQuery(url: string) {
  const window = getWindow();
  const query: Record<string, any> = {};
  let urlToParse = url || window.location.href;
  let i;
  let params;
  let param;
  let length;
  if (typeof urlToParse === "string" && urlToParse.length) {
    urlToParse =
      urlToParse.indexOf("?") > -1 ? urlToParse.replace(/\S*\?/, "") : "";
    params = urlToParse.split("&").filter((paramsPart) => paramsPart !== "");
    length = params.length;

    for (i = 0; i < length; i += 1) {
      param = params[i].replace(/#\S+/g, "").split("=");
      query[decodeURIComponent(param[0])] =
        typeof param[1] === "undefined"
          ? undefined
          : decodeURIComponent(param.slice(1).join("=")) || "";
    }
  }
  return query;
}

// 对象序列化
export function serializeObject(obj: Record<string, any>, parents = []) {
  if (typeof obj === "string") return obj;
  const resultArray: any[] = [];
  const separator = "&";
  let newParents: any;
  function varName(name: string) {
    if (parents.length > 0) {
      let parentParts = "";
      for (let j = 0; j < parents.length; j += 1) {
        if (j === 0) parentParts += parents[j];
        else parentParts += `[${encodeURIComponent(parents[j])}]`;
      }
      return `${parentParts}[${encodeURIComponent(name)}]`;
    }
    return encodeURIComponent(name);
  }
  function varValue(value: string) {
    return encodeURIComponent(value);
  }
  Object.keys(obj).forEach((prop) => {
    let toPush;
    if (Array.isArray(obj[prop])) {
      toPush = [];
      for (let i = 0; i < obj[prop].length; i += 1) {
        if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === "object") {
          newParents = parents.slice();
          newParents.push(prop);
          newParents.push(String(i));
          toPush.push(serializeObject(obj[prop][i], newParents));
        } else {
          toPush.push(`${varName(prop)}[]=${varValue(obj[prop][i])}`);
        }
      }
      if (toPush.length > 0) resultArray.push(toPush.join(separator));
    } else if (obj[prop] === null || obj[prop] === "") {
      resultArray.push(`${varName(prop)}=`);
    } else if (typeof obj[prop] === "object") {
      // Object, convert to named array
      newParents = parents.slice();
      newParents.push(prop);
      toPush = serializeObject(obj[prop], newParents);
      if (toPush !== "") resultArray.push(toPush);
    } else if (typeof obj[prop] !== "undefined" && obj[prop] !== "") {
      // Should be string or plain value
      resultArray.push(`${varName(prop)}=${varValue(obj[prop])}`);
    } else if (obj[prop] === "") resultArray.push(varName(prop));
  });
  return resultArray.join(separator);
}

// 判断是否是对象
export function isObject(o: any) {
  return (
    typeof o === "object" &&
    o !== null &&
    o.constructor &&
    o.constructor === Object
  );
}

// 合并
export function merge(...args: any) {
  const to = args[0];
  args.splice(0, 1);
  const from = args;

  for (let i = 0; i < from.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (
        let nextIndex = 0, len = keysArray.length;
        nextIndex < len;
        nextIndex += 1
      ) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}

// 对象继承
export function extend(...args: any) {
  let deep = true;
  let to;
  let from;
  if (typeof args[0] === "boolean") {
    deep = args[0];
    to = args[1];
    args.splice(0, 2);
    from = args;
  } else {
    to = args[0];
    args.splice(0, 1);
    from = args;
  }
  for (let i = 0; i < from.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (
        let nextIndex = 0, len = keysArray.length;
        nextIndex < len;
        nextIndex += 1
      ) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (!deep) {
            to[nextKey] = nextSource[nextKey];
          } else if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}

export function bindMethods(
  instance: Record<string, unknown>,
  obj: Record<string, any>
) {
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      Object.keys(obj[key]).forEach((subKey) => {
        if (typeof obj[key][subKey] === "function") {
          obj[key][subKey] = obj[key][subKey].bind(instance);
        }
      });
    }
    instance[key] = obj[key];
  });
}
