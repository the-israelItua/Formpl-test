import IconsList from "../../assets/svgs";

const Icon = ({ id, ...props }) => {
  const selectedIcon = IconsList[id];
  return selectedIcon ? selectedIcon(props) : null;
};

export default Icon;
