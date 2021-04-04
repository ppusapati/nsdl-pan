var reader = require("buffered-reader");
const axios = require("axios");
var BinaryReader = reader.BinaryReader;
var DataReader = reader.DataReader;
let data = {
  UserID: "V0139201",
  Signature: "",
  PAN: "AMXPP6546K",
};
var close = function (binaryReader, error) {
  if (error) console.log(error);

  binaryReader.close(function (error) {
    if (error) console.log(error);
  });
};

var file = "./data.sig";
var offset;

new DataReader(file, { encoding: "utf8" })
  .on("error", function (error) {
    console.log(error);
  })
  .on("line", function (line, nextByteOffset) {
    console.log(line);
    if (line != null) {
      // offset = nextByteOffset;
      data.Signature += line;
      this.interrupt();
    }
  })
  .on("end", function () {
    console.log(data.Signature);
    
    let postData = JSON.stringify(data);
    axios
      .post(
        "https://59.163.46.2/TIN/PanInquiryBackEnd",
        {
          postData,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer 123abc456def",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .read();
console.log(data.Signature);
