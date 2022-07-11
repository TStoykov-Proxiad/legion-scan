import { useState } from "react";
import { Button } from "react-bootstrap";
import MyImage from "./Image";

export default function Images({ images, handleNext, handlePrev }) {

    const [isThumbnail, setIsThumbnail] = useState(true);

    const imgs = images.map((image) => { return (<MyImage key={image.guid} image={image} isThumbnail={isThumbnail} />) });

    return (
        <div className="images">
            <nav className="img-nav">
                <h5 className="img-nav-text">Result for Search ID: {images[0].createdAt-1}</h5>
                <Button className="nav-btns" onClick={handlePrev}>Previous Page</Button>
                <Button className="nav-btns" onClick={handleNext}>Next Page</Button>
                <Button className="nav-btns" onClick={() => setIsThumbnail(!isThumbnail)}>{isThumbnail ? "Show full pictures" : "Show Thumbnails"}</Button>
            </nav>
            {imgs}
        </div>
    );
}

