import './error.css'

export default function Error(props) {
    let message;
    let error = props.error
    let code;
    switch (props.origin) {
        case 'profile':
            if (props.code === '404') {
                // profile not found
                code = '404'
                message = 'This profile could not be found'
            }
            error = null;
            break;
        default:
            code = '500'
            message = 'An Unexpected Error Has Occurred'
            break;
    }
    return(
        <div className='error-container'>
            <div className ='error-code'>{code}</div>
            <div className='error-message'>{message}</div>
            <div className='error-error'>{error}</div>
        </div>
    )
}