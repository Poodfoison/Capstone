
import { Modal, Button } from 'react-bootstrap';
import { PasswordAuthForm } from "./PasswordAuthForm";

export const UpdateInfo = (props,) => {


  


  return (
    <>
    <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
          
                
              >

                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Update Info
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body >
               <PasswordAuthForm/>
                </Modal.Body>
                <Modal.Footer>

                <Button onClick={props.onHide} variant="outline-success">Close</Button>
                </Modal.Footer>
              </Modal>

    </>
    
  )
}