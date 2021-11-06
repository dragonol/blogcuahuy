import Image from "next/image";
import * as Components from "..";

export const PersonalSection: React.FC = (): JSX.Element => {
  return (
    <div
      id={Components.Type.LandingPageSectionType_Personal}
      className="pt-10 lg:pt-36 w-full flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="md:w-5/12 w-7/12">
          <Image src="/images/Huy.png" alt="" width="1000" height="1000" />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h2 className="mb-3">
            . Mình là <span className="text-blue-700 animate-bounce">Huy </span>
            <span className="animate-blink">_</span>
          </h2>
          <p className="text-center leading-normal m-0">
            Mình là một ví dụ điển hình của một đứa gen Z chính hiệu =)) Mình
            viết code để kiếm sống, thích hát hò, yêu cái đẹp hay nghĩ vẩn vơ và
            thỉnh thoảng hay gõ blog.
          </p>
        </div>
      </div>
    </div>
  );
};
