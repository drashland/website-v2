import * as stringService from "../../../../src/services/string_service";

describe("string_service.js", () => {
  describe.each(getConvertFilenameToURLVariables())("convertFilenameToURL()", (variables) => {
    it("should convert filenames to URLs", () => {
      const actual = stringService.convertFilenameToURL(variables.input);
      expect(actual).toStrictEqual(variables.expected);
    });
  });
});

function getConvertFilenameToURLVariables() {
  return [
    {
      input: "/docs/drash/v2.x/1_getting_started/1_introduction.md",
      expected: "/drash/v2.x/getting-started/introduction",
    }
  ];
}
