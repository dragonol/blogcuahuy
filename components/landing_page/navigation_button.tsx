import Image from "next/image";
import classNames from "classnames";
import * as Components from "../index";

export const NavigationButton: React.FC<Components.Type.NavigationButtonProps> =
  (props: Components.Type.NavigationButtonProps): JSX.Element => {
    const dotTemplate = classNames(
      "bg-yellow-400 rounded-full h-2 w-2 absolute left-16 transition-opacity"
    );

    const sectionDotClass = classNames(dotTemplate, {
      "opacity-0": props.sectionType != props.currentSectionType,
    });

    const handleOnclick = () => {
      props.onclickCallback({ sectionType: props.sectionType });
    };

    return (
      <div className="relative flex items-center justify-center">
        <a href={"#" + props.sectionType}>
          <div className="transform hover:scale-110 transition flex items-center justify-center">
            <Image
              src={props.iconSrc}
              height="30"
              width="30"
              className="cursor-pointer"
              onClick={handleOnclick}
            />
          </div>
        </a>
        <div className={sectionDotClass}></div>
      </div>
    );
  };
