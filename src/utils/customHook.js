import {useEffect, useRef} from 'react';

export const useCustomEffectHandler = (fn, inputs) => {
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            fn(); // execute specific task if not the first render
        } else {
            didMountRef.current = true;
        }
    }, inputs); // inputs as the dependency passed to useEffect
}
