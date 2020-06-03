/* eslint-disable no-console */
import axios from "axios";
import { message } from "antd";
import { get as getData } from "lodash";
import { Base64 } from "js-base64";

const instance = axios.create({
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8"
  }
});

// eslint-disable-next-line no-unused-vars
export function get(url, params, options = {}) {
  return instance
    .get(url, {
      params: {
        ...params
      }
    })
    .then(response => {
      console.log("请求的地址:", url);
      console.log("请求的参数:", params);
      console.log("请求的返回值", response.status, response.data);

      if (response.status === 200) {
        const { data } = response;
        if (data.success === false) {
          if (data.errorCode === 600) {
            window.location.href = `/user/wechat/login/${Base64.encodeURI(
              window.location.href
            )}`;
            return;
          }
          // 针对聚合接口做错误提示
          if (/205020666/.test(url)) {
            // 去匹配第一个api的错误然后提示
            const errors = getData(response, "data.errors", []);
            const apiIds = getData(response, "data.apiIds", []);
            if (errors.length > 0 && apiIds.length > 0) {
              let errorNeed = null;
              errors.forEach(error => {
                if (error.id === apiIds[0]) {
                  errorNeed = error;
                }
              });
              if (errorNeed !== null) {
                message.error(getData(errorNeed, "info.message", "操作失败"));
              }
            } else {
              message.error(data.message || "操作失败");
            }
          } else {
            message.error(data.message || "操作失败");
          }
        }
        return response.data;
      }
    })
    .catch(err => {
      const errMsg = err.message || "请求失败";
      return { success: false, results: {}, message: errMsg };
    });
}
export function post(url, body, options = {}) {
  // 设置默认提示参数
  const toastSwitch = getData(options, "toastSwitch", {
    success: false,
    error: false
  });

  return instance
    .post(url, body)
    .then(response => {
      console.log("请求的地址:", url);
      console.log("请求的参数:", body);
      console.log("请求的返回值", response.status, response.data);
      const { data } = response;
      if (response.status === 200) {
        if (data.success === true && toastSwitch.success) {
          message.success("操作成功");
        } else if (data.success === false && toastSwitch.error) {
          if (data.errorCode === 600) {
            window.location.href = `/user/wechat/login/${Base64.encodeURI(
              window.location.href
            )}`;
            return;
          } else {
            message.error(data.message || "操作失败");
          }
        }
        return response.data;
      }
    })
    .catch(err => {
      const errMsg = err.message || "操作失败";
      if (toastSwitch.error) {
        message.error(errMsg);
      }
      return { success: false, results: {}, message: errMsg };
    });
}
