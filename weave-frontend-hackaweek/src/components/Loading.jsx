import load from "../assets/loading.mp4";

export default function Load() {
  return (
    <div className="load-content">
      <video src={load} autoPlay muted loop playsInline></video>
    </div>
  );
}
