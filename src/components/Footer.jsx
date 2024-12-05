import styled from "styled-components";
import { FaArrowUp, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiNotionFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleScrollTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const textNav = [
    "About",
    "Blog",
    "Schedule",
    "Information",
    "Safety Management",
    "Contact",
  ];

  const iconNav = [
    { name: FaYoutube, link: "https://www.youtube.com/" },
    { name: FaInstagram, link: "https://www.instagram.com/" },
    { name: FaXTwitter, link: "https://x.com/" },
    {
      name: RiNotionFill,
      link: "https://www.notion.so/138e179383bb809a88e5f2c3e6a566e2",
    },
    { name: FaGithub, link: "https://github.com/goorm-festiva/Festiva" },
  ];

  return (
    <FooterBox>
      <FooterWrap>
        <ScrollTop>
          <FaArrowUp onClick={() => handleScrollTop(pathname)} />
        </ScrollTop>
        <Nav>
          {textNav.map((menu, index) => {
            return (
              <p key={index} onClick={() => handleScrollTop("/AllEvent")}>
                {menu}
              </p>
            );
          })}
        </Nav>
        <Icons>
          {iconNav.map((icon, index) => {
            const IconComponent = icon.name;
            return (
              <a href={icon.link} key={index} target="_blank">
                <IconComponent />
              </a>
            );
          })}
        </Icons>
        <span>© 2024 FestivaCompany, Inc. All right reserved</span>
      </FooterWrap>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled.footer`
  width: 100%;
  margin: 100px auto 0;
  background-color: #000;
  color: #666;
  position: relative;
`;

const ScrollTop = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 40px;
  top: -70px;
  font-size: 20px;
  cursor: pointer;
`;

const FooterWrap = styled.div`
  width: clamp(850px, 100%, 1400px);
  padding: 60px 50px;
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  gap: 40px;

  span {
    font-size: 13px;
    color: #666;
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 40px;

  a {
    color: #666;
    text-decoration: none;
  }

  p {
    transition: 0.4s;
    &:hover {
      cursor: pointer;
      color: #fff;
    }
  }
`;

const Icons = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;

  svg {
    color: #666;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      cursor: pointer;
      color: #fff;
    }
  }
`;
