import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import '../resources/app.css';
import { useDispatch } from 'react-redux';
import { useBooksQuery } from '../services/api';

function PaginationCustom (props)  {
    // console.log('fetch props',props.props)
    const dispatch = useDispatch();

    var [ current_page, last_page, isSuccess, setPage, setPageItem] = props.props
    
    return (    
        <Pagination>
            {/* <Pagination.First 
                style={{display: current_page !== 1 ? 'block' : 'none' }} 
                onClick={
                    () => {
                            if(current_page !== 1){
                                dispatch(setPageItem(1))
                            }
                    }
                }
                isLoading={isSuccess}
            /> */}

            

            <Pagination.Prev 
                style={{display: current_page !== 1 ? 'block' : 'none' }}
                onClick={
                    () => { 
                        if(current_page > 1){
                            // setPage(current_page - 1)
                            
                            dispatch(setPageItem(current_page - 1))
                            console.log('go to previous page') 
                            console.log('current_page',current_page)
                            console.log('last_page',last_page)
                        }
                    }
                }
                isLoading={isSuccess}
            />

            {/* <Pagination.Item 
                style={{display: (current_page !== 1) ? 'block' : 'none' }} 
                onClick={
                    () => { 
                        if(current_page !== 1){
                            dispatch(setPageItem(1))
                            console.log('go to first page') 
                            console.log('current_page',current_page)
                            console.log('last_page',last_page)
                        }
                    }
                }
                isLoading={isSuccess}
            >{1}</Pagination.Item>

            <Pagination.Ellipsis 
                style={{display: (last_page > 3 && ( current_page !== last_page && current_page !== 1 ) ) ? 'block' : 'none' }}
            />
    
            <Pagination.Item 
                isLoading={isSuccess}
            active>{current_page}</Pagination.Item>

            <Pagination.Ellipsis 
                style={{display: (last_page > 3 && ( current_page !== last_page && current_page !== 1 ) ) ? 'block' : 'none' }}
            /> 

            <Pagination.Item
                style={{display: (last_page > 1 && current_page !== last_page ) ? 'block' : 'none' }}
                onClick={
                    () => { 
                        if(current_page !== last_page){
                            dispatch(setPageItem(last_page))
                            console.log('go to last page') 
                            console.log('current_page',current_page)
                            console.log('last_page',last_page)
                        }
                    }
                }
                isLoading={isSuccess}
            >{last_page}</Pagination.Item> */}

            <Pagination.Next 
                // style={{display: current_page < last_page ? 'block' : 'none' }} 
                onClick={
                    () => {
                        if(current_page < last_page){
                            // setPage(current_page + 1)
                            dispatch(setPageItem(current_page + 1))
                            console.log('go to next page') 
                            console.log('current_page',current_page)
                            console.log('last_page',last_page)  
                        }
                    }
                }
                isLoading={isSuccess}
            />
            
            {/* <Pagination.Last 
                style={{display: current_page !== last_page ? 'block' : 'none' }} 
                onClick={
                    () => {
                        if(current_page !== last_page){
                            dispatch(setPageItem(last_page))
                            console.log('go to last page') 
                            console.log('current_page',current_page)
                            console.log('last_page',last_page)
                        }
                    }
                }
                isLoading={isSuccess}
            /> */}
        </Pagination>
    );
    
};

export default PaginationCustom;
