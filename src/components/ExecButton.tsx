import React from "react";
import styled from "@emotion/styled";
import { FaPlay } from "react-icons/fa";

const Button = styled.button((props) => ({
  background: props.disabled ? "gray" : "#1077E5",
  cursor: props.disabled ? "not-allowed" : "pointer",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "4rem",
  height: "4rem",
  boxShadow: "0px 1px 4px #444",
  transition: "all 50ms ease-in-out",
  ["&:active"]: !props.disabled && {
    transform: "scale(0.9)",
    opacity: 0.5,
  },
}));

type Props = {
  executing?: boolean;
  onClick?: () => void;
};

const ExecButton: React.FC<Props> = (props) => {
  return (
    <Button disabled={props.executing} onClick={props.onClick}>
      <FaPlay color="white" size="1.8rem" />
    </Button>
  );
};

export default ExecButton;
