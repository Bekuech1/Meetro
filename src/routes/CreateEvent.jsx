import Private from "@/components/create-event/Private";
import Public from "@/components/create-event/Public";
import React, { useState } from "react";

const CreateEvent = () => {
  const [isPrivate, setIsPrivate] = useState(true); // Initial state is Private

  const switchToPublic = () => setIsPrivate(false);
  const switchToPrivate = () => setIsPrivate(true);

  return (
    <>
      {isPrivate ? (
        <Private onPublic={switchToPublic} />
      ) : (
        <Public onPrivate={switchToPrivate} />
      )}
    </>
  );
};

export default CreateEvent;
