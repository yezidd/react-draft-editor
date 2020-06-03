import { getPropertyToArray, checkTwoIdBig } from "./tool";
import { fetchCommodityBasicByIdsI } from "@/services/commodity";
import { findLastIndex } from "lodash";

/**
 * 聚合聊天记录内容信息
 * @param {array} data 需要聚合的对象数组
 */
// 业务
export const groupOnlineServiceContent = async data => {
  // 输入校验
  if (!(data instanceof Array)) return false;
  if (data.length === 0) return [];

  // type === 3 得到商品 ids
  const commodityIds = getPropertyToArray(
    data.filter(v => v.type === 3),
    "content"
  ).toString();

  // 其他类型消息依次增加

  /**
   * 根据 ids 获取商品信息
   * 返回数据格式为: {id: {}}
   */
  const result =
    commodityIds.length > 0
      ? await fetchCommodityBasicByIdsI({ ids: commodityIds })
      : {};

  return data.map(item => {
    if (item.type === 3) {
      // 商品类型消息
      return {
        ...item,
        commodityInfo: result[item.content]
      };
    } else {
      return item;
    }
  });
};

/**
 * 针对聊天记录的排序
 * nowChatRecord 当前的聊天记录列表
 * newChatRecordItem 要插入队列的消息
 * 值得注意的是此操作是直接修改了nowChatRecord,修改原数组
 */
export const sortRecordList = (nowChatRecord, newChatRecordItem) => {
  // 如果不是的话，那么就需要重新组织顺序
  // 找到最近一条消息比此条消息时间小的消息
  // 然后插入到那个位置之后
  // 找到比此消息时间戳小的最近一个元素
  const needIndex = findLastIndex(
    nowChatRecord,
    o => o.createdTime < newChatRecordItem.createdTime
  );
  // 找到比此消息时间戳小于等于的最近一个元素
  const needEqualIndex = findLastIndex(
    nowChatRecord,
    o => o.createdTime <= newChatRecordItem.createdTime
  );
  // 如果两者相等，则表示没有跟此时间戳相等的消息项，所以直接插入
  if (needIndex === needEqualIndex) {
    nowChatRecord.splice(needIndex + 1, 0, newChatRecordItem);
  }
  // 如果是后者大,则表示中间项是时间戳跟此消息项相等的，则需要根据messageId比较
  if (needIndex < needEqualIndex) {
    // eslint-disable-next-line no-plusplus
    for (let dex = needIndex + 1; dex <= needEqualIndex; dex++) {
      if (
        checkTwoIdBig(
          nowChatRecord[dex].messageId,
          newChatRecordItem.messageId
        ) === 1
      ) {
        nowChatRecord.splice(dex, 0, newChatRecordItem);
        break;
      }
      if (
        checkTwoIdBig(
          nowChatRecord[dex].messageId,
          newChatRecordItem.messageId
        ) === -1 &&
        dex === needEqualIndex
      ) {
        nowChatRecord.splice(dex + 1, 0, newChatRecordItem);
        break;
      }
    }
  }
};
