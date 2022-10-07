import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap';

import logo from '../assets/logo2.png'

export const Feed = () => {

    const [update, seUpdate] = useState([]);

    const getProfile = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "https://capstone-project-stacktrek-svr.herokuapp.com/updates",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            seUpdate(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            getProfile();
            }, 1000);
            return () => clearInterval(interval);
    }, [])

    


  return (
    <>
    <Container style={{ 
      backgroundImage: `url(${logo})`,
      height: `84.8vh`,
      position: `relative`,
      backgroundSize: `auto`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center center`
      }}>
{update.sort((a,b) => b.date.split('-').reverse().join().localeCompare(a.date.split('-').reverse().join())).map(updates => {
                return <Card style={{ 
                    marginBottom: `30px`
                    }}>
      <Card.Header className='fw-semibold text-end'>{updates.date}</Card.Header>
      <Card.Body>
        <Card.Text className='fw-semibold'>
        "{updates.updates}"
        </Card.Text>
        
      </Card.Body>
      
    </Card>
    

})}

                </Container>

    </>

  )
}

 