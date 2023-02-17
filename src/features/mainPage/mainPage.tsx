import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectData } from "../bookList/bookListSlice";
import { useNavigate } from "react-router-dom";
import { loadingStatus } from "../../app/types";

export const MainPage = (): JSX.Element => {
    const navigate = useNavigate()
    const state = useAppSelector(selectData)
    return (
        <Box
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '80%',
                    margin: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                } }>
            <h1>Check out the books we offer</h1>
            { state.status === loadingStatus.loading ?
                <p>loading...</p> :
                <div><button onClick={ () => {
                    navigate('/bookList?page=1')
                } }> Click here for list access!</button>
                    <button onClick={ () => {
                        navigate('/dataGrid')
                    } }> Click here for data grid access!</button></div>
            }

        </Box>
    )
};