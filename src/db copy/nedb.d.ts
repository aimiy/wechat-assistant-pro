declare function _default(database: any): DB;
export default _default;
declare function DB(database: any): void;
declare class DB {
    constructor(database: any);
    db: any;
    limit: (offset: any, limit: any) => DB;
    offset: any;
    sort(orderby: any): DB;
    orderby: any;
    find(query: any, select: any): Promise<any>;
    findOne(query: any, select: any): Promise<any>;
    insert(values: any): Promise<any>;
    update(query: any, values: any, options: any): Promise<any>;
    remove(query: any, options: any): Promise<any>;
}
//# sourceMappingURL=nedb.d.ts.map