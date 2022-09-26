import React from 'react'
import styled from 'styled-components';
import bgimage from '../assets/bg4.jpg'
import { NavigationBar } from './NavigationBar';

const Styles = styled.div`
.hero{
  width: 100%;
  height: 100vh;
  background: url(${bgimage}) no-repeat fixed;
  background-size: cover;
}
.content{
  width: 75%;
  position: absolute;
  top: 15%;
  left: 8%;


}
.content h1{
  color: green; 
  font-size: 75px;
  font-weight: 900;
  line-height: 90px;
  
  text-transform: inherit;
  text-decoration-line: underline;
  width: 70%;

}
.content p{
  width: 55%;
  color: black;
  letter-spacing: 1px;
  word-spacing: 10px;
  margin-top: 25px;
  margin-bottom: 30px;
  font-weight: bold;
}


  
}


.content li {
  display: inline-table;
  margin-top: 25px;
  margin-left: 27px;
  width: 250px;
  height: 290px;
  padding: 15px;
  background-color: white;
  box-shadow: 10px 10px rgba(0, 128, 0, 0.226);
  border: 1px solid black;
}
.content li h2{
  color: green;   
  text-transform: inherit;
  text-decoration-line: underline;
  width: 100%;

}
.content li p{
  width: 100%;
  color: black;
  letter-spacing: 1px;
  word-spacing: 10px;
  margin-top: 25px;
  margin-bottom: 10px;
  font-weight: bold;
}

`;


export const About = () => (
<Styles>
<NavigationBar />
<div className="hero">
    <div className="content">
            <h1>Home Owners Association</h1>
            <p>Due to the pandemic and with the help of technology, most if not all shifted to paperless or automated transactions.
                 Problems like raising or reporting concerns. Since we live in a world where everything happens in a click of a finger security outposts or 
                 guard houses no longer use landline phones.
            </p>
            <p>
                To cater to these type of issues, it would be best to explore new  perspectives in handling homeowners concerns, paper less billing and 
                 easy access to security personnel.
            </p>

        

            <h1>Features</h1>
            <ul>

            <li>
                <h2>Notification Updates</h2>
                <p>Provides notifications for any updates like meetings and news around the community.</p>
            </li>
            <li>
                <h2>Raising Concerns</h2>
                <p>Where homeowners send their concerns to.
                <span> </span><br/>
                <span> </span><br/>
                <span> </span><br/>
                <span> </span><br/>
                </p>
                

            </li>
            <li>
                <h2>Paperless Billing</h2>
                <p>In which the homeowners can be able to check on the monthly bills through the app.</p>
                <span> </span><br/>
            </li>
            <li>
                <h2>Visitor Registration</h2>
                <p>Where you can register and inform that the homeowner will be having visitors.</p>
                <span> </span><br/>
            </li>
            <li>
                <h2>Contacting Security</h2>
                <p>This will also contact and alert security incase of emergencies or if there are concerns.</p>
                <span> </span><br/>
            </li>
        </ul>
        </div>
        </div>
        
             
</Styles>

)