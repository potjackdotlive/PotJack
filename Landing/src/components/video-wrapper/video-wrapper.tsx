import { VideoWrapperProps } from "@/components/video-wrapper/types";

function VideoWrapper({ posterSrc, className, videoSrc }: VideoWrapperProps) {
  return (
    <video
      loop
      muted
      autoPlay
      playsInline
      src={videoSrc}
      poster={posterSrc}
      className={className}
    />
  );
}

export default VideoWrapper;
