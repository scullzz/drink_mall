import dm from "./images/main_logo.svg";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "72px",
      }}
    >
      <img style={{ marginLeft: "24px" }} src={dm} alt="dm" />
    </div>
  );
};

export default Header;
