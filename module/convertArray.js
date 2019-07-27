function getStringTag(value) {
  return '[object Object]' === Object.prototype.toString.call(value);
}
function validateBaseArgs(value) {
  return '[object Arguments]' === Object.prototype.toString.call(value);
}
function makeStyleLoaders(val) {
  return Object.keys(val).map(function (attrPropertyName) {
    return val[attrPropertyName];
  });
}

export default function (value, type) {
  return value || (value = []), validateBaseArgs(value) && (value = [].splice.call(value, 0)), getStringTag(value) && type && (value = makeStyleLoaders(value)), Array.isArray(value) ? value : [value];
};