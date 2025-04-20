export interface R<T> {
  code: number;
  message: string;
  result: T;
}

export interface User {
  /**
   * ID
   */
  id: string;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 用户名
   */
  username: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 创建时间
   * 格式: yyyy-MM-dd HH:mm:ss
   */
  createTime: string; // 或者使用 Date 类型，取决于你的前端处理方式

  /**
   * 创建人ID
   */
  createBy: string;

  /**
   * 更新时间
   * 格式: yyyy-MM-dd HH:mm:ss
   */
  updateTime: string; // 或者使用 Date 类型

  /**
   * 更新人ID
   */
  updateBy: string;
}
export interface Metadata {
  refusal: string;
  finishReason: string;
  index: number;
  id: string;
  role: string;
  messageType: string;
}
export interface Output {
  messageType: string;
  metadata: Metadata;
  toolCalls: any[];
  media: any[];
  text: string;

}

export interface ResultMetadata {
  finishReason: string;
  contentFilters: any[];
  empty: boolean;

}

export interface Result {
  output: Output;
  metadata: ResultMetadata;
}

export interface ChatResponse {
  result: Result
}