import Button from "@/src/components/atoms/Button";
import IcClose from "@/src/components/atoms/Icons/IcClose.component";
import IcUniconChevronRight from "@/src/components/atoms/Icons/IcUniconChevronRight.component";
import IcUpload from "@/src/components/atoms/Icons/IcUpload.component";
import Modal from "@/src/components/molecules/Modal/Modal.component";
import Image from "next/image";
import useProtectedPhotoProfileInputManager from "../../hooks/useProtectedPhotoProfileInputManager.hook";
import HandPose from "../HandPose";

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
            <div className="flex flex-col">
              <p className="text-xl font-bold">Raise Your Hand to Capture </p>
              <p className="text-s">
                We&apos;ll take the photo once your hand pose is detected.
              </p>
            </div>
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

          <div className="flex flex-col gap-y-4 p-6 relative">
            <video
              ref={manager.videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <p className="text-s m">
              To take a picture, follow the hand poses in the order shown below.
              The system will automatically capture the image once the final
              pose is detected.
            </p>
            <div className="flex gap-x-2 items-center justify-center">
              <HandPose
                isActive={manager.gestureSequence.includes(1)}
                order={1}
              />
              <IcUniconChevronRight />
              <HandPose
                isActive={manager.gestureSequence.includes(2)}
                order={2}
              />
              <IcUniconChevronRight />
              <HandPose
                isActive={manager.gestureSequence.includes(3)}
                order={3}
              />
            </div>
            {manager.countdown && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <p className="text-white text-m font-bold">
                  Capturing photo in
                </p>
                <p className="text-white text-display font-bold">
                  {manager.countdown}
                </p>
              </div>
            )}
            <canvas ref={manager.canvasRef} hidden />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProtectedPhotoProfileInput;
