function normalize(phone) {
  return phone.replace(/[\/]+/g, '/').replace(/\/\?/g, '?').replace(/\/#/g, '#').replace(/:\//g, '://');
}

export default function () {
  return normalize([].slice.call(arguments, 0).join('/'));
};