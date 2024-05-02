const _ = require('lodash');

const getInfoData = ({ fields = [], Object = {} }) => {
    return _.pick(Object, fields);
}

module.exports = { getInfoData }