import { useEffect, useRef, useState } from "react";
import notification from "../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
import { useSocketContext } from "@/context/SocketContext";
import OfferNotification from "@/Toast/OfferNotification";

const useListenOffer = () => {
  const { socket  } = useSocketContext();
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const playNotificationSound = () => {
      fetch(notification)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          audioContextRef.current
            .decodeAudioData(arrayBuffer)
            .then((decodedData) => {
              const source = audioContextRef.current.createBufferSource();
              source.buffer = decodedData;
              source.connect(audioContextRef.current.destination);
              source.start(0);
            })
            .catch((error) => {
              console.error("Error decoding audio data: ", error);
            });
        });
    };

    const handleUserGesture = () => {
      if (play) {
        playNotificationSound();
        setPlay(false); // Reset play state after playing the sound
      }
    };

    // Add event listener to trigger audio playback on user gesture
    window.addEventListener("click", handleUserGesture);

    socket?.on("sendOffer", (newOffer) => {
        console.log("newOffer", newOffer);
      newOffer.shouldNotify = true;
      setPlay(true);
      OfferNotification(newOffer);
      
    });
    return () => {
      // Clean up event listener
      window.removeEventListener("click", handleUserGesture);
      // Close the audio context when component unmounts
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [socket]);
};

export default useListenOffer;
