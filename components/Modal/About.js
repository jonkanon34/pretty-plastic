import React from 'react'
import { Modal } from 'react-bootstrap'

const About = (props) => {
  return (
    <Modal 
        show={props.show} 
        onHide={props.handleClose}
        size="lg"
    >
        <Modal.Header closeButton>
            <Modal.Title>Pretty plastic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>“Pretty plastic” is a result of my journey through the life of plastic. This visual tool is created for you to further explore the beauty and aesthetics of plastic. Plastic is supposed and made to last, and I believe that if we can understand the material’s value, we will create a sense of the matter in these objects. It is about time to treat plastic better. Reuse. Recycle. Reduce. We need to radically rethink how we design. Drag, drop, draw, and play around. This tool allows you to explore new creations and show how pretty plastic can actually be. </p>
        </Modal.Body>
    </Modal>
  )
}

export default About
