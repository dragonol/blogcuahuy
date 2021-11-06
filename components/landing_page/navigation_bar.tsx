import Image from "next/image";
import * as Components from "../index";
import { useState, MouseEvent } from "react";

export const NavigationBar: React.FC = (): JSX.Element => {
  const [selectedSection, setSelectedSection] = useState(
    Components.Type.LandingPageSectionType_Personal
  );

  const changeSelectedSection = (
    props: Components.Type.NavigationButtonOnclickProps
  ) => {
    setSelectedSection(props.sectionType);
  };

  return (
    <div className="h-52 fixed mt-auto mb-auto top-0 bottom-0 left-8">
      <div className="transition-opacity flex flex-col rounded-xl bg-gray-100 p-5 justify-center space-y-5 ">
        <Components.LandingPage.NavigationButton
          sectionType={Components.Type.LandingPageSectionType_Personal}
          currentSectionType={selectedSection}
          iconSrc="/icons/personal-icon.svg"
          onclickCallback={changeSelectedSection}
        />
        <Components.LandingPage.NavigationButton
          sectionType={Components.Type.LandingPageSectionType_Article}
          currentSectionType={selectedSection}
          iconSrc="/icons/article-icon.svg"
          onclickCallback={changeSelectedSection}
        />
        <Components.LandingPage.NavigationButton
          sectionType={Components.Type.LandingPageSectionType_Contact}
          currentSectionType={selectedSection}
          iconSrc="/icons/contact-icon.svg"
          onclickCallback={changeSelectedSection}
        />
      </div>
    </div>
  );
};
