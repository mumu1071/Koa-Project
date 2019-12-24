'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../db')

const PolicyModel = sequelize.define('policy_model', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    s1: Sequelize.STRING,
    s2: {
        type: Sequelize.DATE,
        get() {
            const date = new Date(this.getDataValue('s2'))
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        },
    },
    s3: {
        type: Sequelize.DATE,
        get() {
            const date = new Date(this.getDataValue('s3'))
            return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        },
    },
    s4: Sequelize.STRING,
    s5: Sequelize.STRING,
    s6: Sequelize.STRING,
    s7: Sequelize.STRING,
    s8: Sequelize.STRING,
    s9: Sequelize.STRING,
    s10: Sequelize.STRING,
    s11: Sequelize.STRING,
    s12: Sequelize.STRING,
    s13: Sequelize.STRING,
    s14: Sequelize.STRING,
    s15: Sequelize.STRING,
    s16: Sequelize.STRING,
    s17: Sequelize.STRING,
    s18: Sequelize.STRING,
    s19: Sequelize.STRING,
    s20: Sequelize.STRING,
    s21: Sequelize.STRING,
    s22: Sequelize.STRING,
    s23: Sequelize.STRING,
    s24: Sequelize.STRING,
    s25: Sequelize.STRING,
    s26: Sequelize.STRING,
    s27: Sequelize.STRING,
    s28: Sequelize.STRING,
    s29: Sequelize.STRING,
    s30: Sequelize.STRING,
    s31: Sequelize.STRING,
    s32: Sequelize.STRING,
    s33: Sequelize.STRING,
    s34: Sequelize.STRING,
    s35: Sequelize.STRING,
    s36: Sequelize.STRING,
    s37: Sequelize.STRING,
    created_at: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: 'SET DEFAULT' },
}, {
        timestamps: true,
        tableName: 'policy',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })

module.exports = PolicyModel