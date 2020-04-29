const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {
  try {
    const {OPENID} = cloud.getWXContext();
    
    const result = await db.collection('SubscribeMessage').where({
        touser: OPENID,
    }).remove()
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
