declare namespace _default {
    export { addConfig };
    export { updateConfig };
    export { allConfig };
    export { dayTaskSchedule };
    export { roomNewsSchedule };
    export { roomTaskSchedule };
}
export default _default;
/**
 * 添加配置文件
 * @param {*} config
 */
export function addConfig(info: any): Promise<any>;
/**
 * 更新配置文件
 * @param {*} config
 */
export function updateConfig(config: any): Promise<any>;
/**
 * 获取所有配置
 */
export function allConfig(): Promise<any>;
/**
 * 每日任务
 */
export function dayTaskSchedule(): Promise<any>;
/**
 * 群资讯
 */
export function roomNewsSchedule(): Promise<any>;
/**
 * 群任务
 */
export function roomTaskSchedule(): Promise<any>;
//# sourceMappingURL=configDb.d.ts.map