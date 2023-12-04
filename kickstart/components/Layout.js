import 'semantic-ui-css/semantic.min.css'
import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

export default (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};
