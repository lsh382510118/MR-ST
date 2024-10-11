const publishCont = require('./function/publishCont');
const { resSuccess, resFailed } = require('./../../response/result');

const publish = async (req, res) => {
    const data = await publishCont(req.body);
    const result = resSuccess(data)
    res.send(result)
}

module.exports = {
    publish,
}