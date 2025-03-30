
import { useState, useEffect, useRef } from "react";
import KeenSlider, { KeenSliderInstance, KeenSliderOptions } from "keen-slider";

export const useKeenSlider = (options?: KeenSliderOptions) => {
  const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);
  const instanceRef = useRef<KeenSliderInstance | null>(null);

  useEffect(() => {
    if (sliderRef) {
      instanceRef.current = new KeenSlider(sliderRef, {
        ...options,
      });

      return () => {
        if (instanceRef.current) {
          instanceRef.current.destroy();
          instanceRef.current = null;
        }
      };
    }
  }, [sliderRef, options]);

  return [setSliderRef, instanceRef] as const;
};
