import { useState } from "react";
import { Image } from "react-bootstrap";

export default function MyImage({ image, isThumbnail }) {
    const { src, thumbnail } = image.image;
    const [isSelected, setIsSelected] = useState(false);

    return (
        <span className={"img-"+image.guid}>
            <Image src={isThumbnail ? thumbnail : src} onClick={() => { setIsSelected(!isSelected) }} className={isSelected ? "selected" : ""} thumbnail={isThumbnail} download = {isSelected ? src : false}/>
            {isThumbnail ? undefined : <p> {"Search After ID: " + image.createdAt}</p>}
        </span>
    );
}