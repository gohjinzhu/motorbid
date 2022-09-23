import { extendTheme } from "@chakra-ui/react";
import { Form } from "./components/form";
import { Button } from  "./components/button";

export const theme = extendTheme({
    colors: {
        primary: '#df2928',
        secondary: '#ffffff'
    },
    breakpoints: {
        base: '0px',
        sm: '560px',
        md: '600px',
        lg: '1060px',
        xl: '1200px',
        '2xl': '1536px',
    },
    components: {
        Button,
        Form,
    }
})