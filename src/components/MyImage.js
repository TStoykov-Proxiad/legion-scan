import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { urlToPromise } from "./Images";

export default function MyImage({ image, isThumbnail, zipFile }) {
    const { src, thumbnail } = image.image;
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isSelected) {
            zipFile.file(image.name, urlToPromise(src), { binary: true });
        }
        else {
            zipFile.remove(image.name);
        }
    });

    return (
        <span id={"img-" + image.guid} >
            <Image
                src={isThumbnail ? thumbnail : src}
                className={isThumbnail ? 
                (isSelected ? "singleImage selected" : "singleImage") : 
                (isSelected ? "singleImageFull selected" : "singleImageFull")}
                thumbnail={isThumbnail}
                onClick={() => setIsSelected(!isSelected)}
            />
            {isThumbnail ? undefined : <p> {"Search After ID: " + image.createdAt}</p>}
        </span>
    );
}