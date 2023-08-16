import write from "./write";
import { point, line, multipolygon, polygon, multiline } from "./geojson";
import prj from "./prj";
import JSZip from "jszip";

function zip(gj, options, stream = false) {
  var zip = new JSZip(),
    layers = zip.folder(options && options.folder ? options.folder : "layers");

  [point(gj), line(gj), multipolygon(gj), polygon(gj), multiline(gj)].forEach(
    function (l) {
      if (l.geometries.length && l.geometries[0].length) {
        write(
          // field definitions
          l.properties,
          // geometry type
          l.type,
          // geometries
          l.geometries,
          function (err, files) {
            var fileName =
              options && options.types[l.type.toLowerCase()]
                ? options.types[l.type.toLowerCase()]
                : l.type;
            layers!.file(fileName + ".shp", files.shp.buffer, { binary: true });
            layers!.file(fileName + ".shx", files.shx.buffer, { binary: true });
            layers!.file(fileName + ".dbf", files.dbf.buffer, { binary: true });
            layers!.file(fileName + ".prj", prj);
          }
        );
      }
    }
  );

  //Process WILL be in the browser
  // if (!process.browser) {
  //   generateOptions.type = "nodebuffer";
  // }

  if (stream)
    return zip.generateNodeStream({ compression: "STORE", streamFiles: true });
  else return zip.generateAsync({ compression: "STORE" });
}

export default zip;
