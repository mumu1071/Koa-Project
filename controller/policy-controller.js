'use strict'

const nodeExcel = require('excel-export');
const BaseController = require('./base-controller')
const PolicyModel = require('../models/policy')
const excelConfig = require('../config/excel')
const sequelize = require('../db')
const Sequelize = require('sequelize')

const { Op } = Sequelize

class PolicyController extends BaseController {
    constructor() {
        super()
        this.list = this.list.bind(this)
        this.export = this.export.bind(this)
    }

    async list(ctx, next) {
        if (ctx.isAuthenticated()) {
            let { beginDate, endDate } = ctx.query
            beginDate = beginDate || `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            endDate = endDate || `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const where = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('s2')), '>=', sequelize.fn('TO_DAYS', beginDate)),
                    sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('s2')), '<=', sequelize.fn('TO_DAYS', endDate)),
                ]
            }
            let data = await this._list(ctx, { model: PolicyModel, noPage: false, render: false, where, })
            let result = {
                total: data.count,
                list: (data && data.rows || []).map(item => ({
                    id: item.id,
                    s1: item.s1,
                    s2: item.s2,
                    s3: item.s3,
                    s4: item.s4,
                    s5: item.s5,
                    s6: item.s6,
                    s7: item.s7,
                    s8: item.s8,
                    s9: item.s9,
                    s10: item.s10,
                    s11: item.s11,
                    s12: item.s12,
                    s13: item.s13,
                    s14: item.s14,
                    s15: item.s15,
                    s16: item.s16,
                    s17: item.s17,
                    s18: item.s18,
                    s19: item.s19,
                    s20: item.s20,
                    s21: item.s21,
                    s22: item.s22,
                    s23: item.s23,
                    s24: item.s24,
                    s25: item.s25,
                    s26: item.s26,
                    s27: item.s27,
                    s28: item.s28,
                    s29: item.s29,
                    s30: item.s30,
                    s31: item.s31,
                    s32: item.s32,
                    s33: item.s33,
                    s34: item.s34,
                    s35: item.s35,
                    s36: item.s36,
                    s37: item.s37,
                })),
            }
            this._success(ctx, result)
        } else {
            this._notLogin(ctx)
        }
    }

    async export(ctx, next) {
        if (ctx.isAuthenticated()) {
            const { fields } = ctx.query;
            if (!fields) {
                this._error(ctx, '导出的字段不能为空!')
                return
            }
            let fieldArr = fields.split(',')
            let outFilename = "sheet.xml";
            var conf = {};
            conf.stylesXmlFile = outFilename;//输出文件名
            conf.name = "Sheet1";//表格名  

            // 设置表格列
            conf.cols = fieldArr.map(item => ({
                caption: excelConfig[item],
                type: 'string',
            }))

            // 查询数据
            let { beginDate, endDate } = ctx.query
            const date = new Date()
            beginDate = beginDate || `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            endDate = endDate || `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const where = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('s2')), '>=', sequelize.fn('TO_DAYS', beginDate)),
                    sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('s2')), '<=', sequelize.fn('TO_DAYS', endDate)),
                ]
            }
            let data = await this._list(ctx, { model: PolicyModel, noPage: true, render: false, where, })

            // 填充表格数据
            conf.rows = (data && data.rows || []).map(item => {
                return fieldArr.map(ff => item[ff]);
            })

            const result = nodeExcel.execute(conf);
            const resData = Buffer.from(result, 'binary');
            ctx.set('Content-Type', 'application/vnd.ms-excel');
            ctx.set("Content-Disposition", `attachment; filename=${encodeURIComponent('报表')}.xlsx`);
            ctx.body = resData;
        } else {
            this._notLogin(ctx)
        }
    }
}

const policyController = new PolicyController()

module.exports = policyController