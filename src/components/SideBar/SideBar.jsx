import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Demet Yildirim</p>
    </div>
  );
}
export default SideBar;
