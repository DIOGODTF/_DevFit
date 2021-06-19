import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
    flex:1;
    /*justify-content:center;*/
    align-items:center;    
    background-color:#FFF;
    margin-left:30px;
    margin-right:30px;
    margin-top:50px;
`;

const HeaderText = styled.Text`
    font-size:15px;
    color:#333;
    text-align:center;
    /*margin-top:50px;*/
    margin-bottom:30px;   
`;

const BoldText = styled.Text`
    font-weight:bold;
`;

const NextButton = styled.Button``;

const LevelArea = styled.View`
   width:100%;  
`;
const Page = (props) =>{
    let selectedColorButton = "#A5E8BC"
   
    const setMyLevel = (l) => {
        props.setLevel(l);
        props.navigation.setParams({level:l});
    }
    
    let funnyPhrase = '';

    switch(props.workoutDays.length){
        case 1:
            funnyPhrase='só 1 dia não vai adiantar muito, mas...';
            break;
        case 2:   
            funnyPhrase='2 dias eu acho pouco, mas quem sou eu pra te julgar?';
            break; 
        case 3:   
            funnyPhrase='Legal, 3 dias já dá pro gasto...';
            break;     
        case 4:   
            funnyPhrase='Legal, 4 dias vai ser TOP!';
            break;     
        case 5:   
            funnyPhrase='É isso aí, 5 dias é o mínimo, lets GO!';
            break;     
        case 6:   
            funnyPhrase='É, 6 dias não é pra qualquer um...Quero ver... Bora!';
            break;         
        case 7:   
            funnyPhrase='Woow! É isso mesmo? Todo dia? WTF? !!! Bora pro treino...';
            break;          
    }

    return(
      <Container>
         <HeaderText>{funnyPhrase}</HeaderText>
         <HeaderText><BoldText>Qual seu nível hoje?</BoldText></HeaderText>
         <LevelArea>
             <DefaultButton bgcolor={props.level=='beginner'?selectedColorButton:false} onPress={()=>setMyLevel('beginner')} style={{marginBottom:20}} underlayColor ="#CCC" > 
                 <Text> Iniciante / um frango </Text>
             </DefaultButton>  
             <DefaultButton bgcolor={props.level=='intermediate'?selectedColorButton:false} onPress={()=>setMyLevel('intermediate')} style={{marginBottom:20}} underlayColor ="#CCC"> 
                 <Text> Intermediário / Me viro bem </Text>
             </DefaultButton>  
             <DefaultButton bgcolor={props.level=='advanced'?selectedColorButton:false} onPress={()=>setMyLevel('advanced')} style={{marginBottom:20}} underlayColor ="#CCC"> 
                 <Text> Avançado / Primo do The Rock </Text>
             </DefaultButton>               
         </LevelArea>
      </Container>
    );
}
//tem que criar sempre como const pra poder ter acesso ao navigation.options
Page.navigationOptions = ({navigation}) => {
    const nextAction = () => {
       if(!navigation.state.params || !navigation.state.params.level ){
        alert("Você precisa escolher uma opção de nível...");
        return
       }
       navigation.navigate('StarterRecommendations');
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
        level: state.userReducer.level,
        workoutDays: state.userReducer.workoutDays
    }
}

const mapDispatchToProps = (dispatch) => {
    return{    
        setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}})
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Page);