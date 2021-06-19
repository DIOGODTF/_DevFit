import React,{ useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.SafeAreaView`
    flex: 1;
    margin:0 30px;
`;

const Label = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;    
`;

const Input = styled.TextInput`
    border :1px solid #CCC ;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size:16px;
    padding:10px;    
`;

const ListArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const DayItem = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: #EEE;
    justify-content: center;
    align-items: center;
`;

const DayItemText = styled.Text``;

const LevelItem = styled.TouchableHighlight`
    padding: 0 15px;
    background-color: #EEE;
    height: 30px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const LevelItemText = styled.Text``;

//tem que criar sempre como const pra poder ter acesso ao navigation.options
const Page = (props) =>{
    let colorButton = '#A5E8BC';
    const toggleWorkoutDay = (d) => {
        let newWorkoutDays = [...props.workoutDays];
        if (newWorkoutDays.includes(d)){
            if (newWorkoutDays.length == 1) {
                alert('Calma ae! Você tem que treinar pelo menos um dia na semana!');
                return;
            }             
            newWorkoutDays = newWorkoutDays.filter(i=>i!=d);
        } else {
            newWorkoutDays.push(d);
        }
        props.setWorkoutDays(newWorkoutDays);
    }

    return(
      <Container>
          <Label>Seu nome completo:</Label>
          <Input value={props.name} onChangeText={e=>props.setName(e)} />
          <Label>Dias em que você treina:</Label>
          <ListArea>
              <DayItem onPress={()=>toggleWorkoutDay(1)} underlayColor="transparent" style={props.workoutDays.includes(1)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>S</DayItemText>
              </DayItem>    
              <DayItem onPress={()=>toggleWorkoutDay(2)} underlayColor="transparent" style={props.workoutDays.includes(2)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>T</DayItemText>
              </DayItem>
              <DayItem onPress={()=>toggleWorkoutDay(3)} underlayColor="transparent" style={props.workoutDays.includes(3)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>Q</DayItemText>
              </DayItem>
              <DayItem onPress={()=>toggleWorkoutDay(4)} underlayColor="transparent" style={props.workoutDays.includes(4)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>Q</DayItemText>
              </DayItem>
              <DayItem onPress={()=>toggleWorkoutDay(5)} underlayColor="transparent" style={props.workoutDays.includes(5)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>S</DayItemText>
              </DayItem>
              <DayItem onPress={()=>toggleWorkoutDay(6)} underlayColor="transparent" style={props.workoutDays.includes(6)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>S</DayItemText>
              </DayItem>
              <DayItem onPress={()=>toggleWorkoutDay(0)} underlayColor="transparent" style={props.workoutDays.includes(0)?{backgroundColor:colorButton}:{}}>
                  <DayItemText>D</DayItemText>
              </DayItem>
          </ListArea>
          <Label>Seu nível:</Label>
          <ListArea>
              <LevelItem onPress={()=>props.setLevel('beginner')} underlayColor="transparent" style={props.level=='beginner'?{backgroundColor:colorButton}:{}}>
                  <LevelItemText> Iniciante </LevelItemText>
              </LevelItem>
              <LevelItem onPress={()=>props.setLevel('intermediate')} underlayColor="transparent" style={props.level=='intermediate'?{backgroundColor:colorButton}:{}}>
                  <LevelItemText> Intermediário </LevelItemText>
              </LevelItem>
              <LevelItem onPress={()=>props.setLevel('advanced')} underlayColor="transparent" style={props.level=='advanced'?{backgroundColor:colorButton}:{}}>
                  <LevelItemText> Avançado </LevelItemText>
              </LevelItem>
          </ListArea>
      </Container>
    );
}

Page.navigationOptions = ({navigation}) => {
    
    return{
      title:'Configurações',
    }     
}

const mapStatetoProps = (state) => {
    return{        
       name:state.userReducer.name,
       workoutDays:state.userReducer.workoutDays, 
       level:state.userReducer.level
    }
}

const mapDispatchToProps = (dispatch) => {
    return{    
      setName:(name)=>dispatch({type:'SET_NAME', payload:{name}}),
      setWorkoutDays:(workoutDays)=>dispatch({type:'SET_WORKOUTDAYS', payload:{workoutDays}}),
      setLevel:(level)=>dispatch({type:'SET_LEVEL', payload:{level}})
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Page);