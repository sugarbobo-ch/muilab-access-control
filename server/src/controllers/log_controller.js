// Models
const Log = require('../models/log')
const Count = require('../models/count')

const mongoose = require('mongoose')

const getCurrentCount = async (req, res, next) => {
  try {
    const doc = await Count.findOne({ doorId: 'muilab-715' }).exec()
    res.json({
      code: 200,
      type: 'success',
      data: {
        count: doc.count,
        updatedAt: doc.updatedAt
      }
    })
  } catch (error) {
    console.error(error)
    res.json({
      code: 200,
      type: 'error',
      message: error
    })
  }
}

const setCurrentCount = async (req, res, next) => {
  console.log(req.body)
  const { doorId, count } = req.body
  if (doorId && count !== undefined && count !== null) {
    const updateObj = {
      doorId,
      count,
      updatedAt: new Date()
    }
    try {
      const doc = await Count.findOneAndUpdate({ doorId: 'muilab-715' }, updateObj, { new: true, upsert: true })
      res.json({
        code: 200,
        type: 'success',
        data: doc
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        code: 500,
        type: 'error',
        message: error
      })
    }
  } else {
    res.status(500).send({
      code: 500,
      type: 'error',
      message: '參數設定錯誤，需要有門的Id以及人數'
    })
  }
}

const addLog = async (req, res, next) => {
  const { doorId, action, phoneNumber, name } = req.body
  if (doorId && action && phoneNumber && name) {
    try {
      const log = new Log({
        _id: mongoose.Types.ObjectId(),
        doorId,
        phoneNumber,
        name,
        action,
        createdAt: new Date()
      })
      await log.save()
      const countResult = await Count.findOne({ doorId: 'muilab-715' })
      const count = action === 'in'? countResult.count + 1 : countResult.count - 1
      const updateObj = {
        doorId,
        count,
        updatedAt: new Date()
      }
      const currentCountDoc = await Count.findOneAndUpdate({ doorId: 'muilab-715' }, updateObj, { new: true, upsert: true })
      res.json({
        code: 200,
        type: 'success',
        data: {
          count: currentCountDoc.count,
          updatedAt: currentCountDoc.updatedAt
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({
        code: 500,
        type: 'error',
        message: error
      })
    }
  } else {
    res.status(500).send({
      code: 500,
      type: 'error',
      message: '參數設定錯誤，請確認門、姓名、電話、動作等參數有填入'
    })
  }
}

module.exports = {
  getCurrentCount,
  setCurrentCount,
  addLog
}
