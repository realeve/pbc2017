// 同步事件

let mutations = {
  setCurProvince(state,val){
    state.curProvince = val;
  },
  setCurCity(state,val){
    state.curCity = val;
  },
  setTop20Cities(state,val){
    let data = val.sort((a,b)=>{
      return b.value-a.value;
    })    
    state.top20Cities = data.slice(0,20);
  },
  setPeopleCount(state,val){
    state.peopleCount = val;
  },
  refresh(state,val){
    state.needRefresh = val;
  }
}

export default mutations