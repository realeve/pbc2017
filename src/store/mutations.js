// 同步事件
import moment from 'moment';

let mutations = {
  setCurProvince(state,val){
    state.curProvince = val;
  },
  setCurCity(state,val){
    state.curCity = val;
  },
  setTop20Cities(state,val){
    if(!state.isPC){
      return;
    }
    let data = val.sort((a,b)=>{
      return b.value-a.value;
    })    
    state.top20Cities = data.slice(0,20);
  },
  setPeopleCount(state,val){
    state.peopleCount = val;
    if(!state.isPC){
      return;
    }
  },
  refresh(state,val){
    state.needRefresh = val;
    if(val){
      state.nextTime = moment().add(30,'seconds').format('MM-DD HH:MM:SS');
    }
  },
  setBrowser(state,val){
    state.isPC = val;
  },
  setPassed(state,val){
    state.passedCount = val;
  }
}

export default mutations