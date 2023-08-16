import { enlarge, enlargeExtent, blank } from "../src/extent";

describe("extent", function () {
  describe("#blank", function () {
    it("creates an ext", function () {
      var ext = blank();
      expect(ext.xmin).to.be.ok();
      expect(ext.ymin).to.be.ok();
      expect(ext.xmax).to.be.ok();
      expect(ext.ymax).to.be.ok();
    });
  });

  describe("#enlarge", function () {
    it("encloses a point", function () {
      var ext = blank();
      enlarge(ext, [0, 0]);
      expect(ext.xmin).to.eql(0);
      expect(ext.ymin).to.eql(0);
      expect(ext.xmax).to.eql(0);
      expect(ext.ymax).to.eql(0);
    });
  });

  describe("#enlargeExtent", function () {
    it("encloses a extent", function () {
      var ext = blank(),
        extB = blank();
      enlarge(ext, [0, 0]);
      enlarge(ext, [10, 10]);
      enlargeExtent(extB, ext);
      expect(ext.xmin).to.eql(0);
      expect(ext.ymin).to.eql(0);
      expect(ext.xmax).to.eql(10);
      expect(ext.ymax).to.eql(10);
    });
  });
});
