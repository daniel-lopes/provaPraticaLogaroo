import React, { useState, useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import api from "../../services/api";

import {Container, Title, TitleMoreIcon, Icon, Body} from './styles';


function PostListItem() {
  
  const [data, setData] = useState();
  
  
  useEffect(() => {
    function handleGetData() {
      api.get().then(response => {
        setData(response.data);
      }
      );
    };
    handleGetData();
  }, []);
  
    function handleDeletePost(id) {
      let newData = [...data]
      newData = newData.filter((item, index) => index !== id);
      setData(newData);
    }

  return (
    <>
    <FlatList
      data={data}
      refreshing={false}
      renderItem={({ item, index }) => (
        <Container>
          <TitleMoreIcon>
            <Title>
              {item.id}
            </Title>
            <Icon onPress={() => handleDeletePost(index)}>
              <Text>X</Text>
            </Icon>
          </TitleMoreIcon>
          <Body>
            {item.body}
          </Body>
        </Container>
      )}
      keyExtractor={item => item.id.toString()} />
    </>
  );
};

export default PostListItem;