'use strict'

const MongoClient = require("mongodb").MongoClient;

// 连接url
const url = "mongodb://127.0.0.1:27017";

// 数据库名称
const dbName = "test";

class MongoDB {
    constructor() {
        this.dbClient = null;
    }

    /**
     * 获取实例
     */
    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    /**
     * 获取数据库连接，请勿调用
     */
    connect() {
        if (!this.dbClient) {
            this.dbClient = new Promise((resolve, reject) => {
                MongoClient.connect(
                    url,
                    {useUnifiedTopology: true},
                    (err, client) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("连接成功");
                            resolve(client.db(dbName));
                        }
                    }
                );
            });
        }
        return this.dbClient;
    }

    /**
     * 查询所有数据
     * @param {string} tableName 表名
     * @param {object} condition 查询条件
     * @param {object} column 指定列（可选）
     */
    async findAll(tableName, condition = {}, column = {}) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise((reslove, reject) => {
            try {
                collection
                    .find(condition)
                    .project(column)
                    .toArray((err, docs) => {
                        if (err) {
                            reject(err);
                        } else {
                            reslove(docs);
                        }
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 查询单条数据
     * @param {string} tableName 表名
     * @param {object} condition 查询条件
     * @param {object} column 指定列（可选）
     */
    async findOne(tableName, condition = {}, column = {}) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            try {
                let res = await collection.findOne(condition);
                reslove(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 分页查询
     * @param {string} tableName 表名
     * @param {object} condition 查询条件
     * @param {number} pages 页数
     * @param {number} limit 一页查询的条数
     * @param {object} column 指定列（可选）
     */
    async findLimit(tableName, condition, pages, limit, column = {}) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise((reslove, reject) => {
            try {
                collection
                    .find(condition)
                    .project(column)
                    .skip(limit * pages)
                    .limit(limit)
                    .toArray((err, docs) => {
                        if (err) {
                            reject(err);
                        } else {
                            reslove(docs);
                        }
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 查询记录条数
     * @param {string} tableName 表名
     * @param {object} condition 查询条件
     */
    async findCount(tableName, condition) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            try {
                let count = await collection.find(condition).count();
                reslove(count);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 插入数据
     * @param {string} tableName 表名
     * @param {object} data 插入数据
     */
    async insertOne(tableName, data) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.insert(data);
            if (res.result.ok == 1) {
                reslove(true);
            } else {
                reject(false);
            }
        });
    }

    /**
     * 插入多条数据
     * @param {string} tableName 表名
     * @param {Array} data 插入数据数组
     */
    async insertMany(tableName, data) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.insertMany(data);
            if (res.result.ok == 1) {
                reslove({
                    ok: true,
                    n: res.result.n,
                });
            } else {
                reject(false);
            }
        });
    }

    /**
     * 更新一条数据
     * @param {string} tableName 表名
     * @param {object} condition 条件
     * @param {object} data 修改的数据
     */
    async updateOne(tableName, condition, data) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.updateOne(condition, {$set: data});
            if (res.result.ok == 1) {
                reslove(true);
            } else {
                reject(false);
            }
        });
    }

    /**
     * 更新符合条件的所有数据
     * @param {string} tableName 表名
     * @param {object} condition 条件
     * @param {object} data 修改的数据
     */
    async updateMany(tableName, condition, data) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.updateMany(condition, {$set: data});
            if (res.result.ok == 1) {
                reslove({
                    ok: true,
                    n: res.result.n,
                });
            } else {
                reject(false);
            }
        });
    }

    /**
     * 删除一条数据
     * @param {string} tableName
     * @param {object} condition
     */
    async deleteOne(tableName, condition) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.deleteOne(condition);
            if (res.result.ok == 1 && res.result.n != 0) {
                reslove(true);
            } else {
                reslove(false);
            }
        });
    }

    /**
     * 删除符合条件的所有数据
     * @param {*} tableName 表名
     * @param {*} condition 条件
     */
    async deleteMany(tableName, condition) {
        let db = await this.connect();
        const collection = db.collection(tableName);
        return new Promise(async (reslove, reject) => {
            let res = await collection.deleteMany(condition);
            if (res.result.ok == 1 && res.result.n != 0) {
                reslove({
                    ok: true,
                    n: res.result.n,
                });
            } else {
                reject(false);
            }
        });
    }
}

module.exports = MongoDB.getInstance()
