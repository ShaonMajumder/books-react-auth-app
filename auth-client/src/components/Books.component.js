import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../resources/app.css';
import Swal from 'sweetalert2';

import Table from 'react-bootstrap/Table';
import PaginationCustom from './Pagination';
import { useBooksQuery } from '../services/api';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import apiClient,{book_delete_url,useAddBookMutation, useDeleteBookMutation} from '../services/api';
import { Redirect, useHistory } from 'react-router-dom';
import store from '../store'
import { removeItem, setPageItem} from '../reducers/bookSlice';
// import { getBookItems } from '../reducers/bookSlice';
import { useDispatch, useSelector } from "react-redux";

const BookList = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [deleteBook, { isLoading3 }] = useDeleteBookMutation()
    const [validationError,setValidationError] = useState({})
    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if(!isConfirm){
            return;
        }

        // await apiClient.post(`${book_delete_url}/${id}`,[]).then(({data})=>{
        //   Swal.fire({
        //     icon:"success",
        //     text:data.message
        //   })
        
        //   history.push('/')
        
        // }).catch(({response})=>{
        //   if(response.status===422){
        //     setValidationError(response.data.errors)
        //   }else{
        //     Swal.fire({
        //       text:response.data.message,
        //       icon:"error"
        //     })
        //   }
        // })
        
        // dispatch(removeItem(response.originalArg))
        // // console.log('Get State',store.getState().books.bookItems)



        // dispatch(
        //     deleteBook(id).unwrap().then(( response ) => {
        //         Swal.fire({
        //             icon:"success",
        //             text: response.data.message
        //         })
        //     } )
        // );

        const abc = await deleteBook(id)
        .unwrap()
        .then(( response ) => {
            Swal.fire({
                icon:"success",
                text: response.data.message
            })
            history.push('/')
        })
        .catch((error) => console.error('rejected', error))
  
        // }).catch(({response})=>{
        //   if(response.status===422){
        //     setValidationError(response.data.errors)
        //   }else{
        //     Swal.fire({
        //       text:response.data.message,
        //       icon:"error"
        //     })
        //   }
        // })
         
    }
    const [page, setPage] = useState(1);
    
    //run createApi query, set data from reducer listner, then access data into component from store
    const { current_page } = useSelector((store) => store.books)
    useBooksQuery(current_page, {skip: !props.loggedIn});
    const { bookItems, total, per_page,  last_page, error, isLoading, isSuccess } = useSelector((store) => store.books);
    var data_prop = [current_page,last_page, isSuccess, setPage, setPageItem];

    

    
    /*
    console.log("If is logged in",isLoggedIn)
    const [books, setBooks] = React.useState([]);
    React.useEffect(() => {
        if (props.loggedIn) {
            dispatch(getBookItems());
            // dispatch(nextPage());
        }
    }, []);
    
    */

    
   
    if (props.loggedIn) {
        // console.log('geTSTATE ',store.getState().books.bookItems)
        // console.log('experimental GetState',bookItems)
        const bookList = bookItems.map(({ id, title, author }) => 
            <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{author}</td>
                <td>
                    <Button variant="danger" 
                    onClick={()=>deleteProduct(id)}
                    >Delete</Button>
                </td>
            </tr>
        );

        // console.log('data props', data_prop)
        
        return (
            <div className="list-group">
                <Link className='btn btn-primary mb-2 float-end' to={"/books/create"}>
                    Create Book
                </Link>
                <Table responsive="sm" striped bordered hover >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </Table>
                <PaginationCustom props={data_prop} ></PaginationCustom>
            </div>
        );
    }
    return (
        <div className="alert alert-warning">You are not logged in.</div>
    );
};

export default BookList;
