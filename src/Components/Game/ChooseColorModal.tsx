import { useEffect } from "react";
import { ActionType, ColourEnum } from "./GameTypes";
import { Button, Modal } from "react-bootstrap";
import "./ChooseColorModal.css";
import React from "react";

export const ChooseColorModal: React.FC<{ show: boolean, handleClose: () => void, sendColour: (colour: ColourEnum) => void }> = (props) => {
    const [show, setShow] = React.useState<boolean>(false);
    //const [selectedColour, setSelectedColour] = React.useState<ColourEnum>(ColourEnum.Black);
    const [colours, setColours] = React.useState<ColourEnum[]>([]);
    useEffect(() => {
        setShow(props.show);
        const colours = [ColourEnum.White, ColourEnum.Blue, ColourEnum.Green, ColourEnum.Red, ColourEnum.Black];
        setColours(colours);
    }, [props.show]);
    const handleColourSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        let colour = event.currentTarget.style.backgroundColor;
        colour = colour[0].toUpperCase() + colour.substring(1);
        //setSelectedColour(colour as ColourEnum);
        const colourstr = colour as keyof typeof ColourEnum;
        const colourEnum = ColourEnum[colourstr];
        props.sendColour(colourEnum);
        props.handleClose();
    }

return (
    <Modal show={show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Choose colour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="colourSelect">
                {colours.map((colour) => (
                    <button className="colourBtn" key={colour} onClick={handleColourSelect} style={{ backgroundColor: colour.toString() }}>
                    </button>
                ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
                Select
            </Button>
        </Modal.Footer>
    </Modal>
);
}