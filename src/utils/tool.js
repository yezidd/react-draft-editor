/*
 * 复制文本信息
 * @text {String} 将要复制的文本信息
 * */
import { message } from "antd";
import * as R from "ramda";
import currencyjs from "currency.js";
import { parse } from "qs";
import moment from "moment";

// 单元，使用三方？
export function copyToClipboard(text) {
  const aux = document.createElement("input");
  aux.setAttribute("value", text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  message.success("已复制到剪切板");
}

/**
 * 根据 pageBean 判断是否存在下一页
 * @param {Object} pageBean 分页结构
 */
export const hasNextPage = pageBean => {
  const { pageNo, pageSize, totalCount } = pageBean;

  return (
    pageNo <
    Math.floor(totalCount / pageSize) + (totalCount % pageSize === 0 ? 0 : 1)
  );
};

/**
 * 通过属性找到列表中一条数据并删除
 * @param {array} list 需要操作的数组
 * @param {object} propertyName 属性名
 * @param property 需要插入的数据 属性值
 * @return {array} 返回操作后的数组
 */
// 单元
export function deleteOneInList(list, propertyName, property) {
  if (!list) return;

  return R.reject(R.propEq(propertyName, property))(list);
}

// 构建树方法
export const buildTree = list => {
  // 定义根节点
  // const tree = new Node(rootId, 'root');
  const tree = { label: "root", value: "0" };
  findChild(tree, list);

  return tree;
};

/**
 * 递归查找子节点
 */
export const findChild = (node, list) => {
  const curNode = node;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].parentId === curNode.value) {
      // 判断是否存在children
      if (!Object.prototype.hasOwnProperty.call(curNode, "children")) {
        curNode.children = [];
      }

      const newNode = { value: list[i].id, label: list[i].name };
      curNode.children.push(newNode);
      findChild(newNode, list);
    }
  }
};

/**
 * 取出数组成员的某个属性，组成一个新数组
 */
// 单元
export function getPropertyToArray(originArray, property) {
  return R.pluck(property)(originArray);
}

/**
 * 金额转换
 * @param {Number} value 金额 (元)
 */
export const currencyD = value => {
  return currencyjs(value / 100, { precision: 2 });
};

// 对比两个纯数字字符串的大小
export const checkTwoIdBig = (idOne, idTwo) => {
  if (idOne.length > idTwo.length) {
    return 1;
  } else if (idOne.length < idTwo.length) {
    return -1;
  } else {
    const oneArray = idOne.split("");
    const twoArray = idTwo.split("");
    let flag = 0;
    // eslint-disable-next-line no-plusplus
    for (let one = 0; one < oneArray.length; one++) {
      // eslint-disable-next-line no-plusplus
      for (let two = 0; two < twoArray.length; two++) {
        if (one === two) {
          if (oneArray[one] > twoArray[two]) {
            flag = 1;
            break;
          } else if (oneArray[one] < twoArray[two]) {
            flag = -1;
            break;
          } else {
            break;
          }
        }
      }
      if (flag !== 0) {
        break;
      }
    }
    return flag;
  }
};

/*
 * 获取window.location.search内的参数
 * */
// 单元，简单，设置参数默认值
export function getLocationParams() {
  const {
    location: { search }
  } = window;
  return parse(R.replace(/^\?/, "", search));
}
/**
 * 过滤对象中元素为空的元素
 */
// 单元，三方？
export const filterObj = obj => {
  const noEmpty = n => {
    // 数字不做处理
    if (typeof n === "number") {
      return true;
    } else if (typeof n === "boolean") {
      return true;
    } else {
      return !!n;
    }
  };
  return R.filter(noEmpty)(obj);
};
// 处理毫秒为天 小时 分秒
export function formatDuring(mss) {
  const timeData = moment.duration(mss);
  const days = timeData.days();
  const hours = timeData.hours();
  const minutes = timeData.minutes();
  const seconds = timeData.seconds();
  let timeString = "";
  if (days > 0) {
    timeString += `${days.toFixed(0)} 天`;
  }
  if (hours > 0) {
    timeString += `${hours.toFixed(0)} 小时`;
  }
  if (minutes > 0) {
    timeString += `${minutes.toFixed(0)} 分`;
  }
  if (seconds >= 0) {
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      timeString += `-`;
    } else {
      timeString += `${seconds.toFixed(0)} 秒`;
    }
  }
  return {
    overTime: days > 0 || hours > 0 || minutes >= 30,
    timeString
  };
}

/**
 * 获取解析后的 Query String
 */
// 单元，三方？
export const parseQueryString = pathname =>
  parse(String(pathname).replace(/(.*)\?/g, ""));
