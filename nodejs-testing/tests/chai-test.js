const chai = require("chai");
const { expect } = chai;

describe("chai test", () => {
  it("should compare some values", () => {
    expect(1).to.equal(1);
    console.log("ENV=============>", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      console.log("development");
    }
  });

  it("should test some other staff", () => {
    expect({}).to.deep.equal({});
  });

  it("should test object props", () => {
    expect({ name: "foo" }).to.have.property("name").to.equal("foo");
  });

  it("should be testing properly", () => {
    expect(5 > 8).to.be.false;
    expect({}).to.be.a("object");
    expect("foo").to.be.a("string");
    expect(5).to.be.a("number");
    expect("bar").to.be.a("string").with.lengthOf(3);
    expect([1, 2, 3]).to.be.a("array").with.lengthOf(3);
    expect(null).to.be.null;
    expect(undefined).to.not.exist;
    expect(1).to.exist;
  });
});
