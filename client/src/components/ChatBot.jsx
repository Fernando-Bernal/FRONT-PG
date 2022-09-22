import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { useState } from 'react';
import { TbRobot } from 'react-icons/tb'

const theme = {
  background: 'black',
  headerBgColor: '#00ff01',
  headerFontColor: 'black',
  headerFontSize: '20px',
  botBubbleColor: '#00ff01',
  botFontColor: 'black',
  userBubbleColor: 'green',
  userFontColor: 'black',
}

const BotChat = () => {

  const [showModal, setShowModal] = useState(false)
  const changeModal = () => {
    if(showModal === true) setShowModal(false)
    else setShowModal(true)
  }
  
  return (
    <>
      <button className='flex mr-6 text-lg font-bold z-40 absolute right-0 capitalize' onClick={changeModal}>
        <TbRobot className='text-3xl'/> Need Help?
      </button>
    {showModal ? ( 
      <div className='absolute right-4 mt-8'>
      <ThemeProvider theme={theme}>
      <ChatBot
      headerTitle="Sneaker Paradise Chat"
      steps={[
      {
        id: "1",
        message: "Hello, sneakerhead!",
        trigger: "4"
      },
      {
        id: "4",
        message: "Do you need anything from me?",
        trigger: "5"
      },
      {
        id: "5",
        options: [
        { value: "y", label: "Yes", trigger: "6A" },
        { value: "n", label: "No", trigger: "6B" },
        ]
      },
      {
        id: "6A",
        message: "Great! Tell me what are you looking for...",
        trigger: "selection"
      },
      {
        id: "6B",
        message: "Im sorry if I cannot be of help to you. See you later",
        end: true
      },
      {
        id: "selection",
        options: [
        { value: "h", label: "Help", trigger: "7A" },
        { value: "b", label: "Information", trigger: "7B" },
        { value: "c", label: "Bug", trigger: "bugSelection"}
        ]
      },
      {
        id: "7A",
        message: "I see you need some help. What can I do for you?",
        trigger: "helpSelection"
      },
      {
        id: "7B",
        message: "You need to know more about...",
        trigger: "informationSelection"
      },
      {
        id: "helpSelection",
        options: [
        { value: "Account", label: "Account", trigger: "9" },
        { value: "Chart", label: "Shoe size", trigger: "10" },
        { value: "Order", label: "Order problem", trigger: "bugSelection" }
        ]
      },
      {
        id: "informationSelection",
        options: [
        { value: "AboutUs", label: "About us", trigger: "12" },
        {value: "Authentication", label: "Authentication", trigger: "13"},
        {value: "Pictures", label: "Pictures", trigger: "14"},
        ]
      },
      {
        id: "bugSelection",
        component: (<div>Oh no! Please contact us through this <Link to={'/ContactUs'} className='hover:text-blue-500 underline'>form</Link></div>),
        trigger: "16"
      },
      {
        id: "9",
        component: (<Link to={'/account'} className='hover:text-blue-500 underline'><div>Visit your account</div></Link>),
        trigger: "15"
      },
      {
        id: "10",
        component: (<Link to={'/SizeChart'} className='hover:text-blue-500 underline'><div>Check our size chart!</div></Link>),
        trigger: "15"
      },
      {
        id: "12",
        component: (<Link to={'/AboutUs'} className='hover:text-blue-500 underline'><div>Get to know us more</div></Link>),
        trigger: "15"
      },
      {
        id: "13",
        message: 'Our sneakers are 100% legitimate, authenticated by StockX',
        trigger: "15"
      },
      {
        id: "14",
        component: (<a href='https://twitter.com/SneakerParadis3'><div>Visit our Twitter!</div></a>),
        trigger: "15"
      },     
        {
        id: "15",
        message: "Do you need to know anything else?",
        trigger: "16",
      },
      {
        id: "16",
        options: [
        { value: "y", label: "Yes", trigger: "6A" },
        { value: "n", label: "No", trigger: "6B" },
        ],
      }
      ]}
    />
    </ThemeProvider>
    </div>
    ) : null}
  </>
  )
}

export default BotChat