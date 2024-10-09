import React from "react";
import { ColourEnum } from "../Game/GameTypes";

export const fontColour = (colour: ColourEnum) => {
    switch (colour.toString()) {
        case "Black":
            return "White";
        case "Blue":
            return "White";
        default:
            return "Black";
    }
}
export const cardDisplayColour = (colour: ColourEnum) => {
    switch (colour.toString()) {
        case "Multi":
            return "Pink";
        case "Blue": return "#0000FF";
        default:
            return colour.toString();
    }
};