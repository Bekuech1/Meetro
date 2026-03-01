import React from "react";
import ImageInput from "../layout-components/Inputs/ImageInput";
import Alert from "../layout-components/Alert";
import Toggle from "../layout-components/Selectors/Toggle";
import TagButton from "../layout-components/Buttons/TagButton";

const Private = () => {

  return (
    <div className="flex justify-between">

      <section className="sm:w-fit w-full h-fit flex flex-col gap-4">
        <div className="grid h-fit w-full">
          <h5 className="text-black text-[14px] font-[700] leading-[20px] satoshi capitalize">
            event image
          </h5>
          <p className="text-[#8A9191] text-[12px] font-[500] leading-[18px] satoshi capitalize">
            Upload a JPEG or PNG file with a size of 2mb or less
          </p>
        </div>
        <ImageInput/>
        <Alert title="Images with a 1 : 1 ratio (a square) work best" option="outline"/>
      </section>

      <section className="fix">
        <div className="flex ">
          <TagButton size="sm" text="Private"/>
          <TagButton size="sm" text="Public"/>
        </div>
      </section>
    </div>
  );
};

export default Private;
