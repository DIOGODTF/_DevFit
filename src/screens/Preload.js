import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
const Preload = (props) => {
    //por enquanto vai ficar fixo...
    /*
    props.navigation.dispatch(StackActions.reset({
        index:0,
        actions:[
            NavigationActions.navigate({routeName:'StarterStack'})
        ]
    }));
    */
    
    if (!props.name){
       //va para StarterStack
       props.navigation.dispatch(StackActions.reset({
           index:0,
           actions:[
               NavigationActions.navigate({routeName:'StarterStack'})
           ]
       }));
    } else {
       //va para AppTab
       props.navigation.dispatch(StackActions.reset({
           index:0,
           actions:[
               NavigationActions.navigate({routeName:'AppTab'})
           ]
       }));
    }
    
    return null;
}

const mapStatetoProps = (state) => {
    return {
        name:state.userReducer.name
    };
}

export default connect(mapStatetoProps)(Preload);