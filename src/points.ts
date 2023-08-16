import { enlarge, blank } from "./extent.js";

function writePoints(coordinates, extent, shpView, shxView) {
  var contentLength = 28, // 8 header, 20 content
    fileLength = 100,
    shpI = 0,
    shxI = 0;

  coordinates.forEach(function writePoint(coords, i) {
    // HEADER
    // 4 record number
    // 4 content length in 16-bit words (20/2)
    shpView.setInt32(shpI, i);
    shpView.setInt32(shpI + 4, 10);

    // record
    // (8 + 8) + 4 = 20 content length
    shpView.setInt32(shpI + 8, 1, true); // POINT=1
    shpView.setFloat64(shpI + 12, coords[0], true); // X
    shpView.setFloat64(shpI + 20, coords[1], true); // Y

    // index
    shxView.setInt32(shxI, fileLength / 2); // length in 16-bit words
    shxView.setInt32(shxI + 4, 10);

    shxI += 8;
    shpI += contentLength;
    fileLength += contentLength;
  });
}

function extent(coordinates) {
  return coordinates.reduce(function (extent, coords) {
    return enlarge(extent, coords);
  }, blank());
}

function parts(geometries, TYPE) {
  return geometries.length;
}

function shxLength(coordinates) {
  return coordinates.length * 8;
}

function shpLength(coordinates) {
  return coordinates.length * 28;
}

export { writePoints, extent, parts, shxLength, shpLength };
