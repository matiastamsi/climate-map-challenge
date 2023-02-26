import { useRef, useEffect } from 'react';

function GetSelectedLocationId(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default GetSelectedLocationId;