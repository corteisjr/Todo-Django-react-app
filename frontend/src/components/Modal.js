import { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }
}

handleChange = (e) => {
  let { name, value } = e.target;
  if (e.target.type === "checkbox") {
    value = e.target.checked;
  }
  const activItem = { ...this.state.activeItemm, [name]: value };
  this.setState({ activItem });
};
