export const Form = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            transform: "scale(0.85) translateY(-24px)"
          }
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
          transform: "scale(0.85) translateY(-24px)"
        },
        "input::placeholder, textarea::placeholder": {
          opacity: 0,
        },
        "input:focus::placeholder, textarea:focus::placeholder": {
          opacity: 1,
        },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "white",
          pointerEvents: "none",
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: "left top"
        }
      }
    }
  },
}