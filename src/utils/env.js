/**
 * 是否是线上环境
 */
// 业务
export const isProd = () => /mama\.dxy\.com/i.test(window.location.host);

// 是否是线上环境，返回对应的host
export const systemHost = () =>
  isProd() ? "https://mama.dxy.com" : "https://mama.dxy.net";

/**
 * 通过路由判断当前后台是商桥系统还是管理后台
 */
// 业务
export function getSystemType() {
  const match = /^\/(system|manage)((?=\/)|$)/.exec(location.pathname);

  if (match) {
    return match[1];
  }
}
/**
 * 返回后台名称
 */
// 业务
export function getSystemTitle() {
  const SystemTitleMap = {
    system: "商桥系统",
    manage: "管理后台"
  };
  const type = getSystemType();

  return SystemTitleMap[type] || "";
}
