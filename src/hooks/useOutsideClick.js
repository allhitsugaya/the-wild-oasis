import { useContext, useEffect, useRef } from 'react';

function useOutsideClick(handler, listenForTheEvent = true) {

  const ref = useRef()

  useEffect(function(){
    function handleClick(e){
      if(ref.current && !ref.current.contains(e.target)){
        handler();
      }
    }
    document.addEventListener('click', handleClick, listenForTheEvent)
    return () => document.removeEventListener('click', handleClick, listenForTheEvent)
  }, [handler])

  return ref;
}

export default useOutsideClick;