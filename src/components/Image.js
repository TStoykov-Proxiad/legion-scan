import { useState } from "react";
import { Image } from "react-bootstrap";
import { urlToPromise } from "./Images";

export default function MyImage({ image, isThumbnail, zipFile }) {
    const { src, thumbnail } = image.image;
    const [isSelected, setIsSelected] = useState(false);
    const handleClick = () =>{
        setIsSelected(!isSelected);
        if(!isSelected){
            zipFile.file(image.name, urlToPromise(src), { binary: true });
        }
        else{
            zipFile.remove(image.name);
        }
    }
    return (
        <span className={"img-"+image.guid}>
            <Image src={isThumbnail ? thumbnail : src} onClick={() => handleClick()} className={isSelected ? "selected" : ""} thumbnail={isThumbnail}/>
            {isThumbnail ? undefined : <p> {"Search After ID: " + image.createdAt}</p>}
        </span>
    );
}