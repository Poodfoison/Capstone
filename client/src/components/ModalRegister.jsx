import React from "react";
import { Modal, Form,Button   } from 'react-bootstrap';
import Register from "./Register";

export const ModalRegister = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form.Group  className="p-4 p-sm-3">
      <Register/>

      </Form.Group>

      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide} variant="outline-success">Close</Button>
      </Modal.Footer>
    </Modal>
  );

}
