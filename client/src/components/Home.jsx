import React from 'react'
import styled from 'styled-components';
import bgimage from '../assets/bg.jpg'
import { NavigationBar } from './NavigationBar';

const Styles = styled.div`
.content{
    width: 100%;
    position: absolute;
    top: 50%;
    background-color: rgba(255, 255, 255, 0.753);

}

.content h1{
    padding-left: 50px;
    left: 8%;
    right: 8%;
    color: black;
    font-size: 75px;
    font-weight: 900;
    line-height: 90px;
    text-transform: inherit;
    width: 70%;
    
    
}
.content h1 span{
    color: green;
    
}
.content p{
    padding-left: 50px;
    width: 75%;
    color: black;
    letter-spacing: 3px;
    word-spacing: 10px;
    margin-top: 25px;
    margin-bottom: 30px;
    font-weight: bold;

}
.hero{
    width: 100%;
    height: 95vh;
    position: relative;
    background-size: cover;
    background: url(${bgimage}) no-repeat fixed bottom;
}



`;

export const Home = () => (
    

    <Styles>
        <NavigationBar />
        <div className="hero">
  <div className="content">
    <h1>Home Owners <span>Association </span></h1>
    <p> This will help make a paperless transaction and easy access in raising concerns, contacting security, notifying incoming visitors and billing concerns.
            </p>
              </div>
              </div>
              </Styles >
)