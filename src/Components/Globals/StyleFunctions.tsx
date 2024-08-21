import React from "react";
import { ColourEnum } from "../Game/GameTypes";

export const fontColour = (colour: ColourEnum) => {
    switch (colour.toString()) {
        case "Black":
            return "White";
        default:
            return "Black";
    }
}
export const cardDisplayColour = (colour: ColourEnum) => {
    switch (colour.toString()) {
        case "Multi":
            return "Pink";
        default:
            return colour.toString();
    }
};