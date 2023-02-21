/**
 * 记录群聊天记录 记录格式
 * { roomName: '群名', roomId: '', content: '内容', contact: '用户名', wxid: '', time: '时间' }
 * @param info
 * @returns {Promise<unknown>}
 */
export function addRoomRecord(info: any): Promise<unknown>;
/**
 * 获取指定群的聊天记录
 * @param room
 * @returns {Promise<*>}
 */
export function getRoomRecord(roomName: any): Promise<any>;
/**
 * 清楚指定群的聊天记录
 * @param roomName
 * @returns {Promise<void>}
 */
export function removeRecord(roomName: any): Promise<void>;
/**
 * 获取指定群聊的所有聊天内容
 * @param rooName
 * @param day 取的天数
 * @returns {Promise<*>}
 */
export function getRoomRecordContent(rooName: any, day: any): Promise<any>;
//# sourceMappingURL=roomDb.d.ts.map