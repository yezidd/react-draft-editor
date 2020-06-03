// 必填表单通用规则
export const rules = [
  {
    required: true,
    message: "此信息为必填项"
  }
];

// 商品销售渠道
export const COMMODITY_CHANNEL = {
  "1": "丁香妈妈",
  "2": "健康商城"
};
// 丁香妈妈商城
export const DXMM_SELL = "1";
// 健康商城
export const HEALTH_SELL = "2";

// 丁香妈妈客服场景
export const DXMM_SERVICE = 1;
// 健康商城客服场景
export const HEALTH_MALL_SERVICE = 3;

// 客服消息类型MAP
export const SERVICE_MESS_TYPE_MAP = {
  TEXT: 1, // 文本
  PICTURE: 2, // 图片
  COMMODITY: 3, // 商品
  TIP: 4, //  (触发人工客服排队消息)
  ROBOT_QUESTION_LIST: 5, // 七鱼消息(推荐问题列表)
  ROBOT_TO_SPECIALIST: 6, // 七鱼消息(申请人工客服)
  VIDEO: 8, // 视频
  CARD_DATA: 10, // 其他业务线商品卡片
  ORDER_INFO: 12, // 订单信息
  AUTO_FINISH_REMIND: 13, // 自动关闭提醒
  AUTO_FINISH: 14, // 自动关闭
  MANUAL_FINISH: 15, // 人工关闭
  FEEDBACK: 21 // 客服评价反馈
};

/*
 * 订单及支付状态
 * */
export const ORDER_STATUS = {
  0: "初始状态",
  1: "待支付",
  2: "支付成功",
  3: "支付失败",
  4: "支付中",
  20: "待发货",
  21: "已发货",
  22: "确认收货",
  23: "待退货",
  24: "退货中",
  25: "已退货",
  26: "部分发货",
  30: "已出库",
  40: "待退款",
  41: "退款中",
  42: "退款成功",
  44: "退款失败",
  60: "订单关闭",
  61: "订单取消",
  62: "订单完成",
  63: "订单删除"
};

/*
 * 退款申请的状态
 * */
export const REFUND_APPLY_STATUS = {
  0: "未申请",
  1: "待处理",
  2: "拒绝申请",
  3: "同意申请",
  4: "用户已退货",
  5: "商家已收货",
  6: "退款中",
  7: "退款成功",
  8: "已关闭",
  9: "用户取消",
  10: "确认退款",
  11: "拒绝退款",
  12: "退款失败"
};

/**
 * 买家退款申请状态
 */
export const REFUND_APPLY_STATUS_MAP = {
  NOT_PROCESS: 1, // 待处理
  REJECT: 2, // 拒绝申请
  PASS: 3, // 同意申请
  RETURN_GOODS: 4, //  用户已退货
  RECEIPT: 5, //  商家已收货
  REFUNDING: 6, //  退款中
  REFUNDED: 7, //  退款成功
  CLOSE: 8, //  已关闭
  CANCEL: 9, //  用户取消
  CONFIRM_REFUND: 10, //  确认退款
  REJECT_REFUND: 11, //  拒绝退款
  REFUNDED_FAIL: 12 //  退款失败
};

// 历史会话中的状态
export const HISTORY_CHAT_STATUS_MAP = {
  NO_CHAT: 1, // 已关闭
  IN_CHAT: 2, // 沟通中
  FINISHED: 3, // 已结束
  CLOSED: 4 // 已关闭
};
export const HISTORY_CHAT_STATUS = {
  1: "已关闭",
  2: "沟通中",
  3: "已结束",
  4: "已关闭"
};

export const REFUND_DESCRIPTION_TYPE = {
  1: "主动退款",
  2: "用户申请退款",
  3: "线下退款"
};

export const REFUND_TYPE = {
  1: "赔偿",
  2: "降价补差",
  3: "其他",
  4: "仅退款",
  5: "退货退款"
};

export const RESPONSIBLE_PARTY = {
  0: "平台",
  1: "商家",
  2: "平台",
  3: "用户"
};
/**
 * 工单状态
 */
export const TICKET_STATUS = {
  0: "待处理",
  1: "沟通中",
  2: "已关闭",
  3: "待分配"
};
