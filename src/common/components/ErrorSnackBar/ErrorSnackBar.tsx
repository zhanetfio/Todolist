import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setAppErrorAC} from "../../../state/app-reducer";
import {AlertProps, Snackbar} from "@material-ui/core";
import {forwardRef} from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <Alert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const dispatch=useAppDispatch()
    const error =useAppSelector(state=>state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({error:null}))
    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
