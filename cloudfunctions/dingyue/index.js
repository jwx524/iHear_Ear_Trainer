const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: 'OPENID',
      page: 'index',
      data: {
        thing1: {
          value: '您有新的学习任务需要完成噢~'
        },
        thing2: {
          value: '视唱练耳'
        },
      },
      templateId: '3oKMgxRhW3dapI_hEbftSgUUnqjaAS9P06LIkD0Ewv4'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}