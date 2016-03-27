export const dmsToDecimal = function(h,m,s) {
  return h + (m/60) + (s/3600);
};

export const gpsDirection = function(direction, num) {
  if(direction === 'S' || direction === 'W') {
    return num * -1;
  }

  return num;
};
