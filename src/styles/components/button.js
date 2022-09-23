export const Button = {
    variants: {
        'active': {
            bg: 'white',
            height: '10',
            textDecoration: 'none',
            color: 'primary',
            px: '0',
            _after: {
                content: '""',
                background: 'primary',
                width: '100%',
                height: '4px',
                borderRadius: '2px',
                position: 'absolute',
                top: '10'
            }
        },
        'link': {
            color: 'black',
            bg: 'white',
            height: '10',
            textDecoration: 'none',
            _hover: {
                textDecoration: 'none',
                _after: {
                    content: '""',
                    background: 'primary',
                    width: '100%',
                    height: '4px',
                    borderRadius: '2px',
                    position: 'absolute',
                    top: '10'
                }
            }
        },
        'dark': {
            color: 'white',
            bg: 'primary',
            _hover: {
                bg: '#590505',
                textDecoration: 'none',
            }
        }
    }
}