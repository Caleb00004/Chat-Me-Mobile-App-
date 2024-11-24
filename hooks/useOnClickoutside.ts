import { useEffect, useRef, useCallback } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

function useClickOutside(callback: () => void) {
  const ref = useRef<View>(null);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (ref.current) {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          const { locationX, locationY } = event.nativeEvent;

          const isOutside =
            locationX < pageX ||
            locationX > pageX + width ||
            locationY < pageY ||
            locationY > pageY + height;

          if (isOutside) {
            callback();
          }
        });
      }
    },
    [callback]
  );

  useEffect(() => {
    Keyboard.dismiss(); // Optionally dismiss the keyboard when clicking outside
  }, []);

  return { ref, handleClickOutside };
}

export default useClickOutside;