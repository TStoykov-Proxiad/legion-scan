import Images from "./Images";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Alert, Spinner } from "react-bootstrap";

export function ImagesWrapper({ searchId }) {

    const [searchAfter, setSearchAfter] = useState([]);
    const { images, isLoading, isError } = useImages(searchAfter[searchAfter.length - 1]);

    const handleNext = () => {
        setSearchAfter(arr => [...arr, images[images.length - 1].createdAt])
    };

    const handlePrev = () => {
        setSearchAfter(
            () => {
                if (searchAfter.length > 1)
                    return searchAfter.filter(element => element !== searchAfter[searchAfter.length - 1]);
                return searchAfter;
            }
        )
    };

    if (!searchAfter.includes(searchId)) {
        setSearchAfter(searchAfter => [...searchAfter, searchId]);
    }

    if (isError) return (
        <Alert key={isError.status} variant="danger">
            <Alert.Heading as={'h1'}>{isError.info.code}</Alert.Heading>
            {isError.info.messages.map((message) => { return (<p>{message}</p>) })}
            <Alert.Link href="/">Go back to home page</Alert.Link>.
        </Alert>
    );

    if (isLoading) return <Spinner animation="border" variant="primary" />

    return (
        <Images images={images} handleNext={handleNext} handlePrev={handlePrev} />
    );
}

function useImages(searchAfter) {
    const { fetcher } = useSWRConfig();
    const { data, error } = useSWR("https://api.thesearchfactory.com/engines/search?refresh=false&slug=bulgaria-2022&searchAfter=" + searchAfter + "&version=1657201285624&hostname=legionrun.thesearchfactory.com", fetcher)
    return {
        images: data?.hits,
        isLoading: !error && !data,
        isError: error,
    }

}