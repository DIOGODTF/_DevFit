import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.SafeAreaView`
    flex:1;
    /*justify-content:center;*/
    align-items:center;    
    background-color:#FFF;
    margin-left:30px;
    margin-right:30px;
`;

const HeaderText = styled.Text`
    font-size:22px;
    color:#333;
    margin-top:50px;
    margin-bottom:50px;
`;

const NameInput = styled.TextInput`
    border:1px solid #CCC;
    width:100%;
    height:50px;
    border-radius:10px;
    font-size:16px;
    padding:10px;
`;

const NextButton = styled.Button``;

const Page = (props) =>{
    const nextAction = () =>{
       if(!props.name){
           alert("Você precisa informar um nome...");
           return
       } 

       props.navigation.navigate('StarterDias');
    }

    const handleChangeName = (t) => {
       props.setName(t);
       props.navigation.setParams({name:t});
    }

    return(
      <Container>
         <HeaderText>Qual é o seu nome?</HeaderText>
         <NameInput 
            value={props.name}
            onChangeText={handleChangeName}
            autoFocus={true}
            autoCapitalize="words"
            onSubmitEditing={nextAction}
         />
      </Container>
    );
}
//tem que criar sempre como const pra poder ter acesso ao navigation.options
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
       if(!navigation.state.params || !navigation.state.params.name ){
        alert("Você precisa informar um nome...");
        return
       }
       navigation.navigate('StarterDias');
    }

    return{
      title:'',  
      headerRight:<NextButton title="Próximo" onPress={nextAction} />,
      headerRightContainerStyle:{
          marginRight:10
      } 
    }
}

const mapStatetoProps = (state) => {
    return{
        name: state.userReducer.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setName:(name)=>dispatch({type:'SET_NAME', payload:{name}})
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Page);