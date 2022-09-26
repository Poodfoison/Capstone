import React, { useState,useEffect } from 'react'
import { Modal, Form,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const UpdateAddress = (props,{setAuth}) => {

  const [updateAddress, setUpdateAddress] = useState("")

  const getProfile = async () => {
      try {
          //fetch api that uses the GET method
          const response = await fetch(
              "http://localhost:8000/account",
              {
                  method: "GET",
                  //retrieving the token and putting it in the Auth header
                  headers: { Authorization: "Bearer " + localStorage.getItem('token') }
              })
          //parsing the json back to a JS object
          const parseRes = await response.json();
          console.log(parseRes)  


          const adData = {
            block: parseRes[0].block,
            lot: parseRes[0].lot,
            street: parseRes[0].street,
            barangay: parseRes[0].barangay,
            city: parseRes[0].city,
            province: parseRes[0].province,

        }
        setUpdateAddress(adData);
        console.log(adData)

      } catch (error) {
          console.log(error.message)
      }
  }



   

    const onChange = e => {    
      setUpdateAddress({...updateAddress, [e.target.name] : e.target.value})
    }

    const { block, lot, street, barangay, city, province } = updateAddress

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {block, lot, street, barangay, city, province}
            
            const response = await fetch(
                "http://localhost:8000/updateaddress",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem('token') 
                    },
                    body: JSON.stringify(body)
                }
            )
            
            const parseRes = await response.json()

            if(parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                toast.success('Update Successfull', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
            } else {
                setAuth(false)
                
            }
 
        } catch (error) {
            console.log(error.message)
        }
    }



    useEffect(() => {
        getProfile();
    }, [])
  return (
    <>
    <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
          
                
              >
                <ToastContainer />
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Update Address
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Form onSubmit={onSubmitForm} >
                <Form.Group  className="p-4 p-sm-3" >

                <Form.Label className="fw-bold">Block No.:</Form.Label>
                  <Form.Control type="text" 
                              id="blockForm" 
                              name="block"
                              value={updateAddress.block}
                              onChange={e => onChange(e)}/>


                <Form.Label className="fw-bold">Lot No.:</Form.Label>
                  <Form.Control type="text" 
                              id="lotForm" 
                              name="lot" 
                              value={updateAddress.lot}  
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Street:</Form.Label>
                  <Form.Control type="text" 
                              id="streetForm" 
                              name="street" 
                              value={updateAddress.street}  
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Barangay:</Form.Label>
                  <Form.Control type="text" 
                              id="barangayForm" 
                              name="barangay" 
                              value={updateAddress.barangay} 
                              onChange={e => onChange(e)}/>
         
                <Form.Label className="fw-bold">City:</Form.Label>
                  <Form.Control type="text" 
                              id="cityForm" 
                              name="city" 
                              value={updateAddress.city}  
                              onChange={e => onChange(e)}/>

                <Form.Label className="fw-bold">Province:</Form.Label>
                  <Form.Control type="text" 
                              id="provinceForm" 
                              name="province" 
                              value={updateAddress.province} 
                              onChange={e => onChange(e)}/>
                <br></br>
                <Button type="submit" variant="outline-success">Update</Button>
                </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>

                <Button onClick={props.onHide} variant="outline-success">Close</Button>
                </Modal.Footer>
              </Modal>

    </>
    
  )
}