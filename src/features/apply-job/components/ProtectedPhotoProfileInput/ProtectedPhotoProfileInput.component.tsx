import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import IcUpload from "@/src/components/atoms/Icons/IcUpload.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import Image from "next/image";
import useProtectedPhotoProfileInputManager from "../../hooks/useProtectedPhotoProfileInputManager.hook";

interface IProtectedPhotoProfileInputProps {
  photoProfileSetting?: string;
  onChange?: (blob: Blob) => void;
  isError?: boolean;
  helperMessage?: string;
}

const ProtectedPhotoProfileInput = ({
  photoProfileSetting,
  onChange,
  helperMessage,
  isError,
}: IProtectedPhotoProfileInputProps) => {
  const manager = useProtectedPhotoProfileInputManager({ onChange });

  if (!photoProfileSetting || photoProfileSetting === "off") return null;
  const isMandatory = photoProfileSetting === "mandatory";

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <p className="text-s font-bold">
          Photo Profile
          {isMandatory && <span className="text-danger-main">*</span>}
        </p>
        <Image
          src={manager.photoUrl || "/images/photo-profile-placeholder.png"}
          width={128}
          height={128}
          alt="Photo profile"
          className="rounded-lg object-cover"
        />

        <Button
          leftIcon={<IcUpload width={16} height={16} />}
          className="w-fit"
          variant="outlined"
          type="button"
          onClick={() => {
            manager.setIsModalOpen(true);
            manager.getStartCameraHandler();
          }}
        >
          Upload Photo
        </Button>
        {isError && (
          <span className="text-s text-danger-main">{helperMessage}</span>
        )}
      </div>

      <Modal
        isOpen={manager.isModalOpen}
        onClose={manager.getStopCameraHandler}
      >
        <Modal.Content className="w-full max-w-[637px]">
          <div className="p-6 flex items-center justify-between border-b border-neutral-40">
            <p className="text-xl font-bold">Take Picture</p>
            <button
              type="button"
              onClick={() => {
                manager.setIsModalOpen(false);
                manager.getStopCameraHandler();
              }}
            >
              <IcClose />
            </button>
          </div>

          <div className="p-6">
            <video
              ref={manager.videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <canvas ref={manager.canvasRef} hidden />
          </div>

          <div className="p-6 border-t border-neutral-40">
            <Button className="w-full" onClick={manager.getTakePictureHandler}>
              Take picture
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProtectedPhotoProfileInput;
