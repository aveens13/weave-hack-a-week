import ReactDom from "react-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
export default function Modal({ open, children, close }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <div className="modal--overlay">
      <div className="modal--hero">
        <button className="close-button" onClick={close}>
          <CancelRoundedIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
