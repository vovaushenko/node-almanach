const chai = require("chai");
const { expect } = chai;

const { add, addCallback, addPromise } = require("./demo");

describe("demo", () => {
  context("pure function", () => {
    it("should add two numbers", () => {
      expect(add(1, 2)).to.equal(3);
    });
  });

  context("callback function", () => {
    it("should test callback", (done) => {
      addCallback(1, 2, (err, result) => {
        expect(result).to.equal(3);
        expect(err).to.be.null;
        done();
      });
    });
  });

  context("test promise", () => {
    it("should add in promise", (done) => {
      addPromise(1, 2)
        .then((res) => {
          expect(res).to.equal(3);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should test a promise with return", () => {
      return addPromise(2, 3).then((res) => {
        expect(res).to.equal(5);
      });
    });
  });
});
