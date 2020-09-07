import React from 'react';
import styled from 'styled-components/native';
import PostList from "./src/screens/PostList/index";

export default class App extends React.Component {
    render(){
        return(
            <Container>
                <PostList />    
            </Container> 
        )
    }
}

const Container = styled.SafeAreaView`
    justify-content: center;
    background-color: #ccc;
    padding-top: 25px;
`;
