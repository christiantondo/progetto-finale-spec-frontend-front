import videoBg from "../assets/videoBG.mov";
import firstFrame from "../assets/firstframe.png";

export default function VideoBackground() {
    return (
        <div className="videoBg">
            <video
                src={videoBg}
                autoPlay
                loop
                muted
                playsInline
                poster={firstFrame}
                preload="auto"
            ></video>
        </div>
    )
}