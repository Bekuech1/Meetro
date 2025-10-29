import TextButton from "../Buttons/TextButtons";
import ImageInput from "../Inputs/ImageInput";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";

const templates = [
  "/event-ph1.png",
  "/event-ph2.jpg",
  "/event-ph3.jpg",
  "/event-ph4.jpg",
  "/event-ph5.jpg",
  "/event-ph6.jpg",
  "/event-ph7.jpg",
];

export default function ImageTemplatesModal({ onSelect, onUpload }) {
  const { close } = useModalContext();

  function ImageItem({ url }) {
    // Handle image select
    function handleSelect(url) {
      onSelect(url);
      close();
    }

    return (
      <div
        className={`cursor-pointer rounded-[16px] md:rounded-[24px]`}
        onClick={() => handleSelect(url)}
      >
        <img src={url} className="block size-full" />
      </div>
    );
  }

  // Handle file select
  function handleUpload(file) {
    // Image preview url
    const previewUrl = URL.createObjectURL(file);
    onSelect(previewUrl);
    onUpload(file);
    close();

    // Cleanup after closing modal
    return () => URL.revokeObjectURL(previewUrl);
  }

  return (
    <Modal.Window
      name="image-templates"
      title="Image Templates"
      desktopWidth="sm:max-w-[900px]"
    >
      {/* Content goes here */}
      <div className="satoshi font-bold text-sm text-[#010E1F]">
        <div className="flex flex-col gap-y-12">
          <div className="grid grid-cols-3 [@media(min-width:440px)]:grid-cols-4 gap-2 sm:gap-4 [&>*]:aspect-square [&>*]:overflow-hidden">
            <ImageInput
              size="md"
              showUpload={false}
              onUpload={handleUpload}
              className="max-md:rounded-[16px]"
            />
            {templates.map((image, i) => (
              <ImageItem key={i} url={image} />
            ))}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-x-4">
            <TextButton text="Cancel" variant="tertiary" onClick={close} />
            <TextButton text="Save" />
          </div>
        </div>
      </div>
    </Modal.Window>
  );
}
