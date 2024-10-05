import { UNVALID_PAYLOAD_DATA_ERROR } from "../../error/index.js"


interface ParsedOptions {
  skip: number
  limit: number
}



type OptionsParsers =
  { [ key: string ] : (v: unknown) => number | never }
  
const optionParsers : OptionsParsers = {
  skip: function (v: unknown) {
    if(v === undefined) return 0;
    const skip = parseInt(v as string);
    if(Number.isSafeInteger(skip) === false) throw UNVALID_PAYLOAD_DATA_ERROR.getWithCustomMessage("Skip option must be a parsable safe integer");
    return skip;
  },
  limit: function (v: unknown): number | never | 10 {
    if(v === undefined) return 0;
    const limit = parseInt(v as string);
    if(Number.isSafeInteger(limit) === false) throw UNVALID_PAYLOAD_DATA_ERROR.getWithCustomMessage("Limit option must be a parsable safe integer");
    if(limit > 10) return 10; // the max return limit is 10
    return limit;
  },
}


export function parseQueryOptions(options: { [key: string]: unknown }): ParsedOptions | never {
  const parsedOptions : { [ key: string ]: any } = {};

  for(let opt in options) {
    if(optionParsers[opt] === undefined) throw UNVALID_PAYLOAD_DATA_ERROR.getWithCustomMessage(`Passed option '${opt}' is not accepted`);
    const optValue = options[opt];

    parsedOptions[opt] = optionParsers[opt](optValue);
  }

  return parsedOptions as ParsedOptions;
}