import * as React from 'react'
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries'


class Books extends React.Component<any,any>{


    public render(){
        console.log(this.props.data)   
        if(this.props.loading){
          return <div>Loading</div>
        }else{
            return <div>{this.props.data.books && this.props.data.books.map((book:any, index:number)=>{
                return <div key={index}>{book.name} - {book.genre}</div>
            })}</div>
        }
    }
}

export default graphql(getBooksQuery)(Books);