import Image from "next/image";
import React from "react";
import Webcam from "react-webcam";

function RecordAnswer() {
  return (
    <div>
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webCam.png"}
          width={200}
          height={200}
          className=" absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button>Record Answer</Button>
    </div>
  );
}

export default RecordAnswer;
