import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MyImage from "./MyImage";
import { saveAs } from "file-saver";

export default function Images({ images, handleNext, handlePrev, downloadId }) {

    const [isThumbnail, setIsThumbnail] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const JSZip = require("jszip");
    let zip = new JSZip();

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const download = () => {
        zip.generateAsync({ type: "blob" })
            .then(function callback(blob) {
                saveAs(blob, downloadId + ".zip");
            });
    }

    const imgs = images.map((image) => {
        return (<MyImage key={image.guid} image={image} isThumbnail={isThumbnail} zipFile={zip} setIsThumbnail={setIsThumbnail}/>);
    });

    return (
        <div className="images">
            <nav className={scrollPosition>0 ? "img-nav scrolled" : "img-nav"}>
                <h5 className="img-nav-text">Result for Search ID: {images[0].createdAt - 1}</h5>
                <Button className="nav-btns" onClick={handlePrev}>Previous Page</Button>
                <Button className="nav-btns" onClick={handleNext}>Next Page</Button>
                <Button className="nav-btns" onClick={() => setIsThumbnail(!isThumbnail)}>{isThumbnail ? "Show full pictures" : "Show Thumbnails"}</Button>
                <Button className="nav-btns" onClick={() => download()}>Download selected</Button>

            </nav>
            {imgs}
        </div>
    );
}

export function urlToPromise(url) {
    var JSZipUtils = require("jszip-utils");
    return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}