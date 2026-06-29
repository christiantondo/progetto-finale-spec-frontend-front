import videoBg from "../assets/videoBG.mov"

export default function VideoBackground() {
    return (
        <div className="videoBg">
            <video src={videoBg} autoPlay loop muted playsInline></video>
        </div>
    )
}