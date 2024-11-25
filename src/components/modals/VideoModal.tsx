import BaseModal from "@/components/modals/BaseModal.tsx";
import {ModalProps} from "@/types/BaseModal.ts";

interface VideoModalProps extends ModalProps {
    videoKey: string,
}

export default function VideoModal({videoKey, isModalOpen, onClose}: VideoModalProps) {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`;

    return (
        <BaseModal isModalOpen={isModalOpen} onClose={onClose} className='lg:w-[1000px] w-[80%] h-[80vh]'>
                <iframe
                    src={videoUrl}
                    title="Video Featurette"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{width: '100%', height: '100%'}}
                ></iframe>
        </BaseModal>
    )
}